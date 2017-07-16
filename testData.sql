USE groceries;

DELETE FROM grocery;
DELETE FROM section;

INSERT INTO section (id, name, color, position)
VALUES
  (0, 'Zuivel', 'bdc3c7', 4),
  (1, 'Vleeswaren', 'e74c3c', 1),
  (2, 'Groenten', '2ecc71', 0),
  (3, 'Kaas', 'f1c40f', 2),
  (4, 'Brood', 'e67e22', 3);

INSERT INTO grocery (name, section_id)
VALUES
  ('melk', 0),
  ('boter', 0),
  ('kipfilet', 1),
  ('karbonade', 1),
  ('slavink', 1),
  ('appel', 2),
  ('banaan', 2),
  ('broccoli', 2),
  ('smeerkaas', 3),
  ('cheesestrings', 3);
