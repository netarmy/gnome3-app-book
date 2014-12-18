#!/usr/bin/env gjs

const Lang = imports.lang;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;
const EBook = imports.gi.EBook;
const EBC = imports.gi.EBookContacts;
const EDS = imports.gi.EDataServer;

const Main = new Lang.Class({
  Extends: GObject.Object.type,
  Name: "Main",
  _init: function () {
    var self = this;
    var ui = new Gtk.Builder()
    this.ui = ui;
    ui.add_from_file("address-book.ui");

    var window = ui.get_object("window1");
    window.resize(300, 400);
    window.show_all();
    window.connect('destroy', Gtk.main_quit);
    this.clients = {};

    var bookColumn = {
      UID: 0,
      NAME: 1,
    }
    var contactColumn = {
      NAME: 0,
      EMAIL: 1,
    }
    
    /**
     * 在右側列出各聯絡人的姓名和郵件地址。
     * parm: ebookcli :: EBookClient
     */
    this.listContacts = function (ebookcli) {
      var q = EBC.BookQuery.any_field_contains("");
      ebookcli.get_contacts(q.to_string(), null, function (so, rs) {
        /* c :: [EContact]
         * 原型
           e_book_client_get_contacts_finish :: EBookClient ->
             GAsyncResult -> IO [EContact] -> GError -> IO ();
         */
        var c = ebookcli.get_contacts_finish(rs, null, null)[1];
        var store = self.contact_view.get_model();
        store.clear();
        if (c && c.length > 0) {

          c.forEach(function (contact) {
            var iter = store.append();
            var name = contact.full_name;
            if (!name) {
              name = contact.nickname;
            }
            if (!name || !contact.email_1) {
              // 資訊不完整，放棄並從ListStore中移除佔位符
              store.remove(iter);
              return;
            }
            store.set_value(iter, contactColumn.NAME, name);
            store.set_value(iter, contactColumn.EMAIL, contact.email_1);
          });
        }
      });
    }
    this.clients = {};
    var book_view = ui.get_object("bookView");
    var selection = ui.get_object("selection");

    /* 加載選中的地址簿*/
    selection.connect('changed', function (s) {
      /* gtk_tree_selection_get_selected :: TreeSelection ->
           (ListStore, TreeIter)
       */
      var selected = s.get_selected();
      var model = selected[1];
      var iter = selected[2];

      var uid = model.get_value(iter, bookColumn.UID); // uid :: String
      if (uid == "") return;
      if (typeof (self.clients[uid]) !== "undefined") {
        var e = self.clients[uid]; // e :: EBookClient
        if (e) {
          self.clients[uid] = e;
          self.listContacts(e);
        }
      } else {
        var source = EDS.Source.new_with_uid(uid, null, null);
        var e = EBook.BookClient.connect_sync(source, null, null);
        if (e) {
          self.clients[uid] = e;
          self.listContacts(e);
        }
      }
    });
    var cell = new Gtk.CellRendererText();
    var column = new Gtk.TreeViewColumn({title: 'Book'});
    column.pack_start(cell, null);
    column.add_attribute(cell, 'text', bookColumn.NAME);
    book_view.append_column(column);

    var contact_view = ui.get_object("contactView");
    this.contact_view = contact_view;
    cell = new Gtk.CellRendererText();
    column = new Gtk.TreeViewColumn({title: 'Name'});
    column.pack_start(cell, null);
    column.add_attribute(cell, 'text', contactColumn.NAME);
    contact_view.append_column(column);

    cell = new Gtk.CellRendererText();
    column = new Gtk.TreeViewColumn({title: 'E-mail'});
    column.pack_start(cell, null);
    column.add_attribute(cell, 'text', contactColumn.EMAIL);
    contact_view.append_column(column);

    // 列出所有資料來源
    var registry = EDS.SourceRegistry.new_sync(null);
    var sources = registry.list_enabled(EDS.SOURCE_EXTENSION_ADDRESS_BOOK);
    if (sources && sources.length > 0) {
      var store = book_view.get_model();
      sources.forEach(function (item) {
        var iter = store.append();
        store.set_value(iter, bookColumn.UID, item.get_uid());
        var name = item.get_display_name();

        // 若能取得後端名稱，則追加於來源名稱之後
        if (item.has_extension(EDS.SOURCE_EXTENSION_ADDRESS_BOOK)) {
          var ext = item.get_extension(EDS.SOURCE_EXTENSION_ADDRESS_BOOK);
          name += ' - ' + ext.get_backend_name();
        }
        // 若能取得帳號名稱，則追加於來源名稱之後
        if (item.has_extension(EDS.SOURCE_EXTENSION_AUTHENTICATION)) {
          var ext = item.get_extension(EDS.SOURCE_EXTENSION_AUTHENTICATION);
          name += ' - ' + ext.get_user();
        }
        store.set_value(iter, bookColumn.NAME, name);
      });
    }
  }
});


Gtk.init(null, null);
var main = new Main();
Gtk.main();
