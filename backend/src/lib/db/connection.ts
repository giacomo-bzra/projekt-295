import Datastore from "nedb-promises";

// Interface beschreibt die Struktur eines CounterLog-Dokuments
export interface CounterLog {
  _id?: string;       // von NeDB automatisch vergeben
  key: string;        // eindeutiger Schlüssel
  count: number;      // Zählerwert
}

// Singleton-Instanz der Datenbank
let db: Datastore<CounterLog> | null = null;

export function counterLogDb() {
  if (!db) {
    db = Datastore.create({
      filename: "./data/counter-log.db",
      autoload: true,
    });
  }
  return db;
}

