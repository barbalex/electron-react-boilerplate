-- 1. alter tables:
alter table geschaefte add column entscheidAwel;
update geschaefte set entscheidAwel = replace(entscheidAwelJahr, '20', '') || '-' || entscheidAwelNr where trim(entscheidAwelJahr) is not null and trim(entscheidAwelNr) is not null;

alter table geschaefte add column entscheidBvv;
-- todo: there is no data in .db now, test with data!
update geschaefte set entscheidBvv = entscheidBvvNr || '-' || entscheidBvvJahr where trim(entscheidBvvJahr) is not null and trim(entscheidBvvNr) is not null;

alter table geschaefte add column entscheidBdv;
update geschaefte set entscheidBdv = entscheidBdvNr || '/' || entscheidBdvJahr where entscheidBdvJahr > 1900 and trim(entscheidBdvNr) is not null;

alter table geschaefte add column entscheidRrb;
update geschaefte set entscheidRrb = entscheidRrbNr || '/' || entscheidRrbJahr where entscheidRrbJahr > 1900 and trim(entscheidRrbNr) is not null;

alter table geschaefte add column entscheidKr;
update geschaefte set entscheidKr = entscheidKrNr || '/' || entscheidKrJahr where entscheidKrJahr > 1900 and trim(entscheidKrNr) is not null;




-- maybe use:
update geschaefte set entscheidAwel = null;
select idGeschaeft, entscheidAwel, entscheidAwelNr, entscheidAwelJahr from geschaefte where entscheidAwelJahr is not null and entscheidAwelNr is not null;

update geschaefte set entscheidBvv = null;
select idGeschaeft, entscheidBvv, entscheidBvvNr, entscheidBvvJahr from geschaefte where entscheidBvv is not null;

update geschaefte set entscheidBdv = null;
select idGeschaeft, entscheidBdv, entscheidBdvNr, entscheidBdvJahr from geschaefte where entscheidBdv is not null;

update geschaefte set entscheidRrb = null;
select idGeschaeft, entscheidRrb, entscheidRrbNr, entscheidRrbJahr from geschaefte where entscheidRrb is not null;

update geschaefte set entscheidKr = null;
select idGeschaeft, entscheidKr, entscheidKrNr, entscheidKrJahr from geschaefte where entscheidKr is not null;

-- 2. update Table geschaefte using updateTables.SQL
-- to remove not any more used fields and alter rechtsmittelEntscheidNr to TEXT

-- 3. update to new version of sqlite using howto.txt