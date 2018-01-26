-- 1. alter tables:

-- 1.1 entscheidAwel:
alter table geschaefte add column entscheidAwel TEXT;
update geschaefte
set entscheidAwel = replace(trim(entscheidAwelJahr), '20', '') || '-' || trim(entscheidAwelNr)
where trim(entscheidAwelJahr) is not null
and trim(entscheidAwelNr) is not null
and replace(trim(entscheidAwelJahr), '20', '') || '-' || trim(entscheidAwelNr) <> '-';

-- test:
select idGeschaeft, entscheidAwel, entscheidAwelNr, entscheidAwelJahr from geschaefte where entscheidAwelJahr is not null and entscheidAwelNr is not null;
select idGeschaeft, entscheidAwel, entscheidAwelNr, entscheidAwelJahr from geschaefte where entscheidAwel is null order by entscheidAwelNr, entscheidAwelJahr;
-- reset:
update geschaefte set entscheidAwel = null;

-- 1.2 entscheidBvv:

alter table geschaefte add column entscheidBvv TEXT;
-- todo: there is no data in .db now, test with data!
update geschaefte set entscheidBvv = trim(entscheidBvvNr) || '-' || trim(entscheidBvvJahr)
where
  trim(entscheidBvvJahr) is not null
  and trim(entscheidBvvNr) is not null
  and length(entscheidBvvJahr) > 2
  and trim(entscheidBvvNr) || '-' || trim(entscheidBvvJahr) <> '-';
update geschaefte set entscheidBvv = trim(entscheidBvvJahr) || '-' || trim(entscheidBvvNr)
where
  trim(entscheidBvvJahr) is not null
  and trim(entscheidBvvNr) is not null
  and length(entscheidBvvJahr) < 3
  and trim(entscheidBvvJahr) || '-' || trim(entscheidBvvNr) <> '-';

-- test:
select idGeschaeft, entscheidBvv, entscheidBvvNr, entscheidBvvJahr from geschaefte where entscheidBvv is not null;
select idGeschaeft, entscheidBvv, entscheidBvvNr, entscheidBvvJahr from geschaefte where entscheidBvv is null order by entscheidBvvNr, entscheidBvvJahr;
-- reset:
update geschaefte set entscheidBvv = null;


-- 1.3 entscheidBdv:

alter table geschaefte add column entscheidBdv TEXT;
update geschaefte
set entscheidBdv = trim(entscheidBdvNr) || '/' || trim(entscheidBdvJahr)
where
  trim(entscheidBdvJahr) is not null
  and trim(entscheidBdvNr) is not null
  and trim(entscheidBdvNr) || '/' || trim(entscheidBdvJahr) <> '/';

-- test:
select idGeschaeft, entscheidBdv, entscheidBdvNr, entscheidBdvJahr from geschaefte where entscheidBdv is not null;
select idGeschaeft, entscheidBdv, entscheidBdvNr, entscheidBdvJahr from geschaefte where entscheidBdv is null order by entscheidBdvNr, entscheidBdvJahr;
-- reset:
update geschaefte set entscheidBdv = null;

-- 1.4 entscheidRrb:

alter table geschaefte add column entscheidRrb TEXT;
update geschaefte
set entscheidRrb = trim(entscheidRrbNr) || '/' || trim(entscheidRrbJahr)
where
  trim(entscheidRrbJahr) is not null
  and trim(entscheidRrbNr) is not null
  and trim(entscheidRrbNr) || '/' || trim(entscheidRrbJahr) <> '/';
-- correct / values:
update geschaefte
set entscheidRrb = null
where
  trim(entscheidRrb) = '/';

-- test:
select idGeschaeft, entscheidRrb, entscheidRrbNr, entscheidRrbJahr from geschaefte where entscheidRrb is not null;
select idGeschaeft, entscheidRrb, entscheidRrbNr, entscheidRrbJahr from geschaefte where entscheidRrb is null order by entscheidRrbNr, entscheidRrbJahr;
-- reset:
update geschaefte set entscheidRrb = null;


-- 1.5 entscheidKr:
alter table geschaefte add column entscheidKr TEXT;
update geschaefte
set entscheidKr = trim(entscheidKrNr) || '/' || trim(entscheidKrJahr)
where
  trim(entscheidKrJahr) > 1900 
  and trim(entscheidKrNr) is not null
  and trim(entscheidKrNr) || '/' || trim(entscheidKrJahr) <> '/';
-- correct / values:
update geschaefte
set entscheidKr = null
where
  trim(entscheidKr) = '/';

-- test:
select idGeschaeft, entscheidKr, entscheidKrNr, entscheidKrJahr from geschaefte where entscheidKr is not null;
select idGeschaeft, entscheidKr, entscheidKrNr, entscheidKrJahr from geschaefte where entscheidKr is null order by entscheidKrNr, entscheidKrJahr;
-- reset:
update geschaefte set entscheidKr = null;



-- 2. update Table geschaefte using updateTables.SQL
-- to remove not any more used fields and alter rechtsmittelEntscheidNr to TEXT

-- 3. update to new version of sqlite using howto.txt