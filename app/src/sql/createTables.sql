DROP TABLE IF EXISTS externe;
CREATE TABLE externe (
  id INTEGER PRIMARY KEY,
  eMail TEXT,
  firma TEXT,
  name TEXT,
  telefon TEXT,
  titel TEXT,
  vorname TEXT
);

DROP INDEX IF EXISTS iExterneVornameName;
CREATE INDEX iExterneVornameName ON externe (vorname, name);

-------------------------------------------

DROP TABLE IF EXISTS interne;
CREATE TABLE interne (
  id INTEGER PRIMARY KEY,
  abteilung TEXT,
  buero TEXT,
  eMail TEXT,
  itKonto TEXT,
  kurzzeichen TEXT UNIQUE,
  name TEXT,
  telefon TEXT,
  titel TEXT,
  vorname TEXT
);

DROP INDEX IF EXISTS iInterneVornameName;
CREATE INDEX iInterneVornameName ON interne (vorname, name);

-------------------------------------------

DROP TABLE IF EXISTS geschaefte;
CREATE TABLE geschaefte (
  abteilung TEXT,
  aktennummer TEXT,
  aktenstandort TEXT,
  ausloeser TEXT,
  benutzer TEXT,
  datumAusgangAwel TEXT,
  datumEingangAwel TEXT,
  details TEXT,
  entscheidAwelJahr INTEGER,
  entscheidAwelNr INTEGER,
  entscheidBdvJahr INTEGER,
  entscheidBdvNr INTEGER,
  entscheidBvvJahr INTEGER,
  entscheidBvvNr INTEGER,
  entscheidKrJahr INTEGER,
  entscheidKrNr INTEGER,
  entscheidRrbJahr INTEGER,
  entscheidRrbNr INTEGER,
  fristAbteilung TEXT,
  fristAmtschef TEXT,
  fristAwel TEXT,
  fristDirektion TEXT,
  fristMitarbeiter TEXT,
  gegenstand TEXT,
  gekoNr TEXT,
  geschaeftsart TEXT REFERENCES geschaeftsart(geschaeftsart) ON UPDATE CASCADE ON DELETE RESTRICT,
  idGeschaeft INTEGER PRIMARY KEY,
  idKontaktExtern_readonly TEXT,
  idKontaktIntern_readonly TEXT,
  idVorgeschaeft TEXT,
  mutationsdatum TEXT,
  mutationsperson TEXT,
  naechsterSchritt TEXT,
  ort TEXT,
  parlVorstossStufe TEXT,
  parlVorstossTyp TEXT REFERENCES parlVorstossTyp(parlVorstossTyp) ON UPDATE CASCADE ON DELETE RESTRICT,
  rechtsmittelInstanz TEXT REFERENCES rechtsmittelInstanz(rechtsmittelInstanz) ON UPDATE CASCADE ON DELETE RESTRICT,
  rechtsmittelErledigung TEXT REFERENCES rechtsmittelErledigung(rechtsmittelErledigung) ON UPDATE CASCADE ON DELETE RESTRICT,
  rechtsmittelEntscheidNr INTEGER,
  rechtsmittelEntscheidDatum TEXT,
  status TEXT REFERENCES status(status) ON UPDATE CASCADE ON DELETE RESTRICT,
  -- first correct data before referencing
  verantwortlich TEXT REFERENCES interne(kurzzeichen) ON UPDATE CASCADE ON DELETE RESTRICT,
  vermerk TEXT,
  vermerkIntern TEXT,
  zustaendigeDirektion TEXT
);
DROP INDEX IF EXISTS iGeschaefteVerantwortlich;
CREATE INDEX iGeschaefteVerantwortlich ON geschaefte (verantwortlich);
DROP INDEX IF EXISTS iGeschaefteFristMitarbeiter;
CREATE INDEX iGeschaefteFristMitarbeiter ON geschaefte (fristMitarbeiter);
DROP INDEX IF EXISTS iGeschaefteGeschaeftsart;
CREATE INDEX iGeschaefteGeschaeftsart ON geschaefte (geschaeftsart);
DROP INDEX IF EXISTS iGeschaefteParlVorstossTyp;
CREATE INDEX iGeschaefteParlVorstossTyp ON geschaefte (parlVorstossTyp);
DROP INDEX IF EXISTS iGeschaefteRechtsmittelInstanz;
CREATE INDEX iGeschaefteRechtsmittelInstanz ON geschaefte (rechtsmittelInstanz);
DROP INDEX IF EXISTS iGeschaefteRechtsmittelErledigung;
CREATE INDEX iGeschaefteRechtsmittelErledigung ON geschaefte (rechtsmittelErledigung);
DROP INDEX IF EXISTS iGeschaefteStatus;
CREATE INDEX iGeschaefteStatus ON geschaefte (status);

-------------------------------------------

DROP TABLE IF EXISTS geschaefteKontakteIntern;
CREATE TABLE geschaefteKontakteIntern (
  idGeschaeft INTEGER REFERENCES geschaefte(idGeschaeft) ON UPDATE CASCADE ON DELETE CASCADE,
  idKontakt INTEGER REFERENCES interne(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (idGeschaeft, idKontakt)
);

INSERT INTO geschaefteKontakteIntern (idGeschaeft, idKontakt)
SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern1
UNION SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern2
UNION SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern3
UNION SELECT geschaefte.idGeschaeft, interne.id
FROM
  geschaefte
  INNER JOIN interne
  ON interne.kurzzeichen = geschaefte.kontaktIntern4;

-------------------------------------------

DROP TABLE IF EXISTS geschaefteKontakteExtern;
CREATE TABLE geschaefteKontakteExtern (
  idGeschaeft INTEGER REFERENCES geschaefte(idGeschaeft) ON UPDATE CASCADE ON DELETE CASCADE,
  idKontakt INTEGER REFERENCES externe(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (idGeschaeft, idKontakt)
);

INSERT INTO geschaefteKontakteExtern (idGeschaeft, idKontakt)
SELECT geschaefte.idGeschaeft, externe.id
FROM
  geschaefte
  INNER JOIN externe
  -- ON instr(geschaefte.idKontaktExtern, externe.name || ' ' || externe.vorname) > 0
  ON geschaefte.idKontaktExtern LIKE '%' || externe.name || ' ' || externe.vorname || '%'
WHERE
  geschaefte.idKontaktExtern <> '';

-------------------------------------------

-- boolean in sqlite is integer
-- true = 1
-- false = 0
DROP TABLE IF EXISTS geschaeftsart;
CREATE TABLE geschaeftsart (
  id integer PRIMARY KEY,
  geschaeftsart TEXT UNIQUE,
  historisch integer DEFAULT 0, 
  sort INTEGER
);

DROP INDEX IF EXISTS iGeschaeftsartSort;
CREATE INDEX iGeschaeftsartSort ON geschaeftsart (sort);

-- now make sure all types
-- contained in geschaefte are included
INSERT INTO
  geschaeftsart(geschaeftsart)
SELECT 
  geschaeftsart
FROM
  geschaefte
GROUP BY
  geschaeftsart
HAVING
  geschaeftsart IS NOT NULL;

-- but only ones to be used actively
-- are not historical 
UPDATE
  geschaeftsart
SET
  historisch = 1
WHERE
  geschaeftsart NOT IN ('Rechtsgeschäft', 'Rekurs/Beschwerde', 'Parlament. Vorstoss', 'Vernehmlassung', 'Strafverfahren', 'Diverses');

-- and actively used ones have a sort value
UPDATE
  geschaeftsart
SET
  sort = 1
WHERE
  geschaeftsart = 'Rechtsgeschäft';

UPDATE
  geschaeftsart
SET
  sort = 2
WHERE
  geschaeftsart = 'Rekurs/Beschwerde';

UPDATE
  geschaeftsart
SET
  sort = 3
WHERE
  geschaeftsart = 'Parlament. Vorstoss';

UPDATE
  geschaeftsart
SET
  sort = 4
WHERE
  geschaeftsart = 'Vernehmlassung';

UPDATE
  geschaeftsart
SET
  sort = 5
WHERE
  geschaeftsart = 'Strafverfahren';

UPDATE
  geschaeftsart
SET
  sort = 6
WHERE
  geschaeftsart = 'Diverses';
-------------------------------------------

DROP TABLE IF EXISTS status;
CREATE TABLE status (
  id integer PRIMARY KEY,
  status TEXT UNIQUE,
  historisch integer DEFAULT 0, 
  sort INTEGER
);

DROP INDEX IF EXISTS iStatusSort;
CREATE INDEX iStatusSort ON status (sort);

-- now make sure all types
-- contained in geschaefte are included
INSERT INTO
  status(status)
SELECT 
  status
FROM
  geschaefte
GROUP BY
  status
HAVING
  status IS NOT NULL;

-- but only ones to be used actively
-- are not historical 
UPDATE
  status
SET
  historisch = 1
WHERE
  status NOT IN ('angekündigt', 'pendent', 'überwachen int.', 'überwachen ext.', 'erledigt');

-- and actively used ones have a sort value
UPDATE
  status
SET
  sort = 1
WHERE
  status = 'angekündigt';
UPDATE
  status
SET
  sort = 2
WHERE
  status = 'pendent';
UPDATE
  status
SET
  sort = 3
WHERE
  status = 'überwachen int.';
UPDATE
  status
SET
  sort = 4
WHERE
  status = 'überwachen ext.';
UPDATE
  status
SET
  sort = 5
WHERE
  status = 'erledigt';

-------------------------------------------

DROP TABLE IF EXISTS parlVorstossTyp;
CREATE TABLE parlVorstossTyp (
  id integer PRIMARY KEY,
  parlVorstossTyp TEXT UNIQUE,
  historisch integer DEFAULT 0, 
  sort INTEGER
);

DROP INDEX IF EXISTS iParlVorstossTypSort;
CREATE INDEX iParlVorstossTypSort ON parlVorstossTyp (sort);

-- now make sure all types
-- contained in geschaefte are included
INSERT INTO
  parlVorstossTyp(parlVorstossTyp)
SELECT 
  parlVorstossTyp
FROM
  geschaefte
GROUP BY
  parlVorstossTyp
HAVING
  parlVorstossTyp IS NOT NULL;

-- but only ones to be used actively
-- are not historical 
UPDATE
  parlVorstossTyp
SET
  historisch = 1
WHERE
  parlVorstossTyp NOT IN ('Anfrage', 'Interpellation', 'Postulat', 'Dringliches Postulat', 'Leistungsmotion', 'Motion', 'Parlamentatische Initiative', 'Vorlage');

  -- and actively used ones have a sort value
UPDATE
  parlVorstossTyp
SET
  sort = 1
WHERE
  parlVorstossTyp = 'Anfrage';
UPDATE
  parlVorstossTyp
SET
  sort = 3
WHERE
  parlVorstossTyp = 'Interpellation';
UPDATE
  parlVorstossTyp
SET
  sort = 4
WHERE
  parlVorstossTyp = 'Postulat';
UPDATE
  parlVorstossTyp
SET
  sort = 5
WHERE
  parlVorstossTyp = 'Dringliches Postulat';
UPDATE
  parlVorstossTyp
SET
  sort = 6
WHERE
  parlVorstossTyp = 'Leistungsmotion';
UPDATE
  parlVorstossTyp
SET
  sort = 7
WHERE
  parlVorstossTyp = 'Motion';
UPDATE
  parlVorstossTyp
SET
  sort = 8
WHERE
  parlVorstossTyp = 'Parlamentatische Initiative';
UPDATE
  parlVorstossTyp
SET
  sort = 9
WHERE
  parlVorstossTyp = 'Vorlage';

-- add missing value
INSERT INTO
  parlVorstossTyp(parlVorstossTyp, historisch, sort)
  VALUES ('Dringliche Anfrage', 0, 2);

-------------------------------------------

DROP TABLE IF EXISTS rechtsmittelErledigung;
CREATE TABLE rechtsmittelErledigung (
  id integer PRIMARY KEY,
  rechtsmittelErledigung TEXT UNIQUE,
  historisch integer DEFAULT 0, 
  sort INTEGER
);

DROP INDEX IF EXISTS iRechtsmittelErledigungSort;
CREATE INDEX iRechtsmittelErledigungSort ON rechtsmittelErledigung (sort);

-- now make sure all types
-- contained in geschaefte are included
INSERT INTO
  rechtsmittelErledigung(rechtsmittelErledigung)
SELECT 
  rechtsmittelErledigung
FROM
  geschaefte
GROUP BY
  rechtsmittelErledigung
HAVING
  rechtsmittelErledigung IS NOT NULL;

-- but only ones to be used actively
-- are not historical 
UPDATE
  rechtsmittelErledigung
SET
  historisch = 1
WHERE
  rechtsmittelErledigung NOT IN ('vollständig zugunsten AWEL', 'überwiegend zugunsten AWEL', 'zur Hälfte zugunsten AWEL', 'überwiegend zulasten AWEL', 'vollständig zulasten AWEL', '-------------------------', 'gegenstandslos', 'Rechtsmittelrückzug Rekurrent', 'Rücknahme durch AWEL', 'andere Gründe');

-- and actively used ones have a sort value
UPDATE
  rechtsmittelErledigung
SET
  sort = 1
WHERE
  rechtsmittelErledigung = 'vollständig zugunsten AWEL';
UPDATE
  rechtsmittelErledigung
SET
  sort = 2
WHERE
  rechtsmittelErledigung = 'überwiegend zugunsten AWEL';
UPDATE
  rechtsmittelErledigung
SET
  sort = 3
WHERE
  rechtsmittelErledigung = 'zur Hälfte zugunsten AWEL';
UPDATE
  rechtsmittelErledigung
SET
  sort = 4
WHERE
  rechtsmittelErledigung = 'überwiegend zulasten AWEL';
UPDATE
  rechtsmittelErledigung
SET
  sort = 5
WHERE
  rechtsmittelErledigung = 'vollständig zulasten AWEL';
UPDATE
  rechtsmittelErledigung
SET
  sort = 6
WHERE
  rechtsmittelErledigung = '-------------------------';
UPDATE
  rechtsmittelErledigung
SET
  sort = 7
WHERE
  rechtsmittelErledigung = 'gegenstandslos';
UPDATE
  rechtsmittelErledigung
SET
  sort = 8
WHERE
  rechtsmittelErledigung = 'Rechtsmittelrückzug Rekurrent';
UPDATE
  rechtsmittelErledigung
SET
  sort = 9
WHERE
  rechtsmittelErledigung = 'Rücknahme durch AWEL';
UPDATE
  rechtsmittelErledigung
SET
  sort = 10
WHERE
  rechtsmittelErledigung = 'andere Gründe';

-------------------------------------------

DROP TABLE IF EXISTS rechtsmittelInstanz;
CREATE TABLE rechtsmittelInstanz (
  id integer PRIMARY KEY,
  rechtsmittelInstanz TEXT UNIQUE,
  historisch integer DEFAULT 0, 
  sort INTEGER
);

DROP INDEX IF EXISTS iRechtsmittelInstanzSort;
CREATE INDEX iRechtsmittelInstanzSort ON rechtsmittelInstanz (sort);

-- now make sure all types
-- contained in geschaefte are included
INSERT INTO
  rechtsmittelInstanz(rechtsmittelInstanz)
SELECT 
  rechtsmittelInstanz
FROM
  geschaefte
GROUP BY
  rechtsmittelInstanz
HAVING
  rechtsmittelInstanz IS NOT NULL;

-- but only ones to be used actively
-- are not historical 
UPDATE
  rechtsmittelInstanz
SET
  historisch = 1
WHERE
  rechtsmittelInstanz NOT IN ('Instanz 2', 'Instanz 3');

-- and actively used ones have a sort value
UPDATE
  rechtsmittelInstanz
SET
  sort = 2
WHERE
  rechtsmittelInstanz = 'Instanz 2';
UPDATE
  rechtsmittelInstanz
SET
  sort = 3
WHERE
  rechtsmittelInstanz = 'Instanz 3';

-- add missing data
INSERT INTO
  rechtsmittelInstanz (rechtsmittelInstanz, historisch, sort)
VALUES
  ('Instanz 1', 0, 1);

-------------------------------------------

DROP TABLE IF EXISTS abteilung;
CREATE TABLE abteilung (
  id integer PRIMARY KEY,
  abteilung TEXT UNIQUE,
  historisch integer DEFAULT 0, 
  sort INTEGER
);

DROP INDEX IF EXISTS iAbteilungSort;
CREATE INDEX iAbteilungSort ON abteilung (sort);

INSERT INTO
  abteilung(abteilung, historisch, sort)
VALUES
  ('AW', 0, 1),
  ('Di', 0, 2),
  ('En', 0, 3),
  ('GS', 0, 4),
  ('Lu', 0, 5),
  ('Re', 0, 6),
  ('WB', 0, 7);

-------------------------------------------

-- set empty values to null:
-- do for all fields
UPDATE geschaefte
SET idKontaktIntern_readonly = NULL
WHERE idKontaktIntern_readonly = ''

-------------------------------------------

-- trim verantwortlich
UPDATE
  geschaefte
SET
  verantwortlich = trim(verantwortlich, ' ')

-------------------------------------------

SELECT
  idGeschaeft,
  verantwortlich
FROM
  geschaefte
  LEFT JOIN interne
  ON interne.kurzzeichen = geschaefte.verantwortlich
WHERE
  verantwortlich IS NOT NULL AND
  kurzzeichen IS NULL


SELECT
  verantwortlich
FROM
  geschaefte
  LEFT JOIN interne
  ON interne.kurzzeichen = geschaefte.verantwortlich
WHERE
  verantwortlich IS NOT NULL AND
  kurzzeichen IS NULL
GROUP BY
  verantwortlich
