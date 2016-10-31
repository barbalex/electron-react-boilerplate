DROP VIEW IF EXISTS v_geschaefte_kontakteExtern;
CREATE VIEW
  v_geschaefte_kontakteExtern
AS
  SELECT
    geschaefteKontakteExtern.idGeschaeft AS idGeschaeft,
    GROUP_CONCAT(externe.name || ' ' || externe.vorname, ", ") AS kontaktExternNameVorname
  FROM
    externe
    INNER JOIN
      geschaefteKontakteExtern
      ON geschaefteKontakteExtern.idKontakt = externe.id
  GROUP BY geschaefteKontakteExtern.idGeschaeft;

DROP VIEW IF EXISTS v_geschaefte_kontakteIntern;
CREATE VIEW
  v_geschaefte_kontakteIntern
AS
  SELECT
    geschaefteKontakteIntern.idGeschaeft AS idGeschaeft,
    GROUP_CONCAT(interne.vorname || ' ' || interne.name, ", ") AS kontaktInternVornameName
  FROM
    interne
    INNER JOIN
      geschaefteKontakteIntern
      ON geschaefteKontakteIntern.idKontakt = interne.id
  GROUP BY geschaefteKontakteIntern.idGeschaeft;

DROP VIEW IF EXISTS v_geschaefte_verantwortlich;
CREATE VIEW
  v_geschaefte_verantwortlich
AS
  SELECT
    geschaefte.idGeschaeft,
    interne.kurzzeichen,
    interne.itKonto,
    interne.vorname || ' ' || interne.name AS verantwortlichVornameName
  FROM
    geschaefte
    LEFT JOIN
      interne
      ON geschaefte.verantwortlich = interne.kurzzeichen;

DROP VIEW IF EXISTS v_geschaefte;
CREATE VIEW
  v_geschaefte
AS
  SELECT
    geschaefte.*,
    v_geschaefte_kontakteIntern.kontaktInternVornameName,
    v_geschaefte_kontakteExtern.kontaktExternNameVorname,
    v_geschaefte_verantwortlich.itKonto,
    v_geschaefte_verantwortlich.verantwortlichVornameName
  FROM
    (((geschaefte
    LEFT JOIN
      v_geschaefte_kontakteIntern
      ON geschaefte.idGeschaeft = v_geschaefte_kontakteIntern.idGeschaeft)
    LEFT JOIN
      v_geschaefte_kontakteExtern
      ON geschaefte.idGeschaeft = v_geschaefte_kontakteExtern.idGeschaeft)
    INNER JOIN
      v_geschaefte_verantwortlich
      ON geschaefte.idGeschaeft = v_geschaefte_verantwortlich.idGeschaeft)
  ORDER BY
    idGeschaeft DESC;


