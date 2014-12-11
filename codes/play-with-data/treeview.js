#!/usr/bin/env seed

Gtk = imports.gi.Gtk;
GObject = imports.gi.GObject;
Main = new GType({
  parent: GObject.Object.type,
  name: "Main",
  init: function (self) {
    var columns = {
      NAME: 0,
      ADDRESS: 1,
    }
    var ui = new Gtk.Builder()
    this.ui = ui;
    ui.add_from_file("treeview.ui");
    var window = ui.get_object("window1");
    window.resize(300, 400);
    window.show_all();
    window.signal.destroy.connect(Gtk.main_quit);
    this.clients = {};
    var view = ui.get_object("view");
    var selection = ui.get_object("selection");
    selection.signal.changed.connect(function (s) {
      var btnRemove = ui.get_object("btnRemove");
      btnRemove.sensitive = true;
    });
    var btnRemove = ui.get_object("btnRemove");
    btnRemove.signal.clicked.connect(function () {
      var selection = view.get_selection();
      if (selection) {
        var selected = {};
        var valid = selection.get_selected(selected);
        if (valid && selected.iter) {
          var model = view.get_model();
          model.remove(selected.iter);
        }
      }
    });
    var btnAdd = ui.get_object("btnAdd");
    btnAdd.signal.clicked.connect(function () {
      var selection = view.get_selection();
      if (selection) {
        var selected = {};
        var valid = selection.get_selected(selected);
        if (valid && selected.iter) {
          var model = view.get_model();
          model.insert(selected.iter, 1);
        }
      }
    });
    column = new Gtk.TreeViewColumn({
      title: 'Name'
    });
    cell = new Gtk.CellRendererText();
    cell.editable = true;
    column.pack_start(cell);
    column.add_attribute(cell, 'text', columns.NAME);
    cell.signal.edited.connect(function (obj, path, text) {
      var store = view.get_model();
      var path = new Gtk.TreePath.from_string(path);
      var iter = {};
      store.get_iter(iter, path);
      store.set_value(iter.iter, columns.NAME, text);
    });
    view.append_column(column);
    column = new Gtk.TreeViewColumn({
      title: 'Address'
    });
    cell = new Gtk.CellRendererText();
    cell.editable = true;
    column.pack_start(cell);
    column.add_attribute(cell, 'text', columns.ADDRESS);
    cell.signal.edited.connect(function (obj, path, text) {
      var store = view.get_model();
      var path = new Gtk.TreePath.from_string(path);
      var iter = {};
      store.get_iter(iter, path);
      store.set_value(iter.iter, columns.ADDRESS, text);
    });
    view.append_column(column);
    var store = view.get_model();
    var iter = {};
    store.append(iter);
    store.set_value(iter.iter, columns.NAME, "Robert");
    store.set_value(iter.iter, columns.ADDRESS, "North Pole");
  }
});
Gtk.init(Seed.argv);
var main = new Main();
Gtk.main();
