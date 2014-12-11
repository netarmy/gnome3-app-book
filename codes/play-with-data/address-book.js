#!/usr/bin/env seed
Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
EBook = imports.gi.EBook;
Main = new GType({
  parent: GObject.Object.type,
  name: "Main",
  init: function (self) {
    var ui = new Gtk.Builder()
    this.ui = ui;
    ui.add_from_file("address-book.ui");

    var window = ui.get_object("window1");
    window.resize(300, 400);
    window.show_all();
    window.signal.destroy.connect(Gtk.main_quit);
    this.clients = {};
 
    var bookColumn = {
      UID: 0,
      NAME: 1,
    }
    var contactColumn = {
      NAME: 0,
      EMAIL: 1,
    }
    this.listContacts = function (e) {
      var c = {};
      var q = EBook.BookQuery.any_field_contains("");
      var r = e.get_contacts_sync(q.to_string(), c, null);
      if (r && c && c.contacts && c.contacts.length > 0) {
        var store = self.contact_view.get_model();
        c.contacts.forEach(function (contact) {
          var iter = {};
          store.append(iter);
          var name = contact.full_name;
          if (!name) {
            name = contact.nickname;
          }
          store.set_value(iter.iter, contactColumn.NAME,
            name);
          store.set_value(iter.iter, contactColumn.EMAIL,
            contact.email_1);
        });
      }
    }
    this.clients = {};
    var book_view = ui.get_object("bookView");
    var selection = ui.get_object("selection");
    selection.signal.changed.connect(function (s) {
      var selected = {}
      s.get_selected(selected);
      var book = selected.model.get_value(selected.iter,
        bookColumn.UID);
      var uid = book.value.get_string();
      if (uid == "") {
        return;
      }
      source = self.sources.peek_source_by_uid(uid);
      var e = null;
      if (typeof (self.clients[uid]) !== "undefined") {
        e = self.clients[uid];
        if (e) {
          self.clients[uid] = e;
          self.listContacts(e);
        }
      } else {
        var e = new EBook.BookClient.c_new(source);
        var r = e.open(false, null, function () {
          if (e) {
            self.clients[uid] = e;
            self.listContacts(e);
          }
        });
      }
    });
    var cell = new Gtk.CellRendererText();
    var column = new Gtk.TreeViewColumn({
      title: 'Book'
    });
    column.pack_start(cell);
    column.add_attribute(cell, 'markup', bookColumn.NAME);
    book_view.append_column(column);
    var contact_view = ui.get_object("contactView");
    this.contact_view = contact_view;
    cell = new Gtk.CellRendererText();
    column = new Gtk.TreeViewColumn({
      title: 'Name'
    });
    column.pack_start(cell);
    column.add_attribute(cell, 'text', contactColumn.NAME);
    contact_view.append_column(column);
    cell = new Gtk.CellRendererText();
    column = new Gtk.TreeViewColumn({
      title: 'E-mail'
    });
    column.pack_start(cell);
    column.add_attribute(cell, 'text', contactColumn.EMAIL);
    contact_view.append_column(column);
    var s = {};
    var e = EBook.BookClient.get_sources(s);
    this.sources = s.sources;
    var groups = this.sources.peek_groups();
    if (groups && groups.length > 0) {
      var store = book_view.get_model();
      groups.forEach(function (item) {
        var iter = {};
        store.append(iter);
        store.set_value(iter.iter, bookColumn.UID, "");
        store.set_value(iter.iter, bookColumn.NAME,
          "<b><i>" + item.peek_name() +
          "</i></b>");
        var sources = item.peek_sources();
        if (sources && sources.length > 0) {
          sources.forEach(function (source) {
            store.append(iter);
            store.set_value(iter.iter, bookColumn.UID,
              source.peek_uid());
            store.set_value(iter.iter, bookColumn.NAME,
              source.peek_name());
          });
        }
      });
    }
  }
});


Gtk.init(Seed.argv);
var main = new Main();
Gtk.main();
