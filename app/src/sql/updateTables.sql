-- in sqlite fields can not be removed from table
-- need to create new table
-- insert data from old
-- remove old
-- rename new


-- interne
insert into interne2 (id, abteilung, buero, eMail, itKonto, kurzzeichen, name, telefon, titel, vorname)
select id, abteilung, buero, eMail, itKonto, kurzzeichen, name, telefon, titel, vorname
from interne

drop table interne

alter table interne2 rename to interne


-- geschaefte
INSERT INTO geschaefte2 (abteilung, aktennummer, aktenstandort, ausloeser, datumAusgangAwel, datumEingangAwel, details, entscheidAwelJahr, entscheidAwelNr, entscheidBdvJahr, entscheidBdvNr, entscheidBvvJahr, entscheidBvvNr, entscheidKrJahr, entscheidKrNr, entscheidRrbJahr, entscheidRrbNr, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, geschaeftsart, idGeschaeft, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, parlVorstossZustaendigkeitAwel, rechtsmittelInstanz, rechtsmittelErledigung, rechtsmittelEntscheidNr, rechtsmittelEntscheidDatum, rechtsmittelTxt, status, verantwortlich, vermerk, vermerkIntern, zustaendigeDirektion)
SELECT abteilung, aktennummer, aktenstandort, ausloeser, datumAusgangAwel, datumEingangAwel, details, entscheidAwelJahr, entscheidAwelNr, entscheidBdvJahr, entscheidBdvNr, entscheidBvvJahr, entscheidBvvNr, entscheidKrJahr, entscheidKrNr, entscheidRrbJahr, entscheidRrbNr, fristAbteilung, fristAmtschef, fristAwel, fristDirektion, fristMitarbeiter, gegenstand, geschaeftsart, idGeschaeft, idVorgeschaeft, mutationsdatum, mutationsperson, naechsterSchritt, ort, parlVorstossStufe, parlVorstossTyp, parlVorstossZustaendigkeitAwel, rechtsmittelInstanz, rechtsmittelErledigung, rechtsmittelEntscheidNr, rechtsmittelEntscheidDatum, rechtsmittelTxt, status, verantwortlich, vermerk, vermerkIntern, zustaendigeDirektion
FROM geschaefte;

-- WARNING:
-- STOP CASCADING ON DELETE REFERENCES BEFORE DROPPING GESCHAEFTE
-- OTHERWISE SOME TABLES ARE EMPTIED, FOR INSCTANCE geschaefteKontakteIntern
DROP TABLE geschaefte;
ALTER TABLE geschaefte2 RENAME TO geschaefte;
-- enable references


--geschaefteKontakteIntern
INSERT INTO
  geschaefteKontakteIntern(idGeschaeft, idKontakt)
SELECT
  geschaefteKontakteIntern_sik.idGeschaeft, geschaefteKontakteIntern_sik.idKontakt
FROM
  geschaefteKontakteIntern_sik
  LEFT JOIN
    geschaefte
    ON geschaefte.idGeschaeft = geschaefteKontakteIntern_sik.idGeschaeft
WHERE
  geschaefte.idGeschaeft IS NOT NULL;


INSERT INTO
  geschaefteKontakteExtern(idGeschaeft, idKontakt)
SELECT
  geschaefteKontakteExtern_sik.idGeschaeft, geschaefteKontakteExtern_sik.idKontakt
FROM
  geschaefteKontakteExtern_sik
  LEFT JOIN
    geschaefte
    ON geschaefte.idGeschaeft = geschaefteKontakteExtern_sik.idGeschaeft
WHERE
  geschaefte.idGeschaeft IS NOT NULL;
