-- in sqlite fields can not be removed from table
-- need to create new table
-- insert data from old
-- remove old
-- rename new

-- create table geschaefte2
-- geschaefte
INSERT INTO geschaefte2 (abteilung, aktennummer, aktenstandort, ausloeser, datumAusgangAwel, datumEingangAwel, details, entscheidAwel, entscheidBdv, entscheidBvv, entscheidKr, entscheidRrb, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, geschaeftsart, idGeschaeft, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, parlVorstossZustaendigkeitAwel, rechtsmittelInstanz, rechtsmittelErledigung, rechtsmittelEntscheidNr, rechtsmittelEntscheidDatum, rechtsmittelTxt, status, verantwortlich, vermerk, vermerkIntern, zustaendigeDirektion)
SELECT abteilung, aktennummer, aktenstandort, ausloeser, datumAusgangAwel, datumEingangAwel, details, entscheidAwel, entscheidBdv, entscheidBvv, entscheidKr, entscheidRrb, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, geschaeftsart, idGeschaeft, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, parlVorstossZustaendigkeitAwel, rechtsmittelInstanz, rechtsmittelErledigung, rechtsmittelEntscheidNr, rechtsmittelEntscheidDatum, rechtsmittelTxt, status, verantwortlich, vermerk, vermerkIntern, zustaendigeDirektion
FROM geschaefte;

-- WARNING:
-- STOP CASCADING ON DELETE REFERENCES BEFORE DROPPING GESCHAEFTE
-- OTHERWISE SOME TABLES ARE EMPTIED, FOR INSCTANCE geschaefteKontakteIntern
PRAGMA foreign_keys = OFF;
DROP TABLE geschaefte;
ALTER TABLE geschaefte2 RENAME TO geschaefte;
-- enable references
PRAGMA foreign_keys = ON;
