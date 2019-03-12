INSERT INTO permissions
(platform, domain, action, summary, description)
VALUES
('dispatch', 'auth',  'login',  'Dispatch access',  'Grants the ability to access the dispatch platform.'),

('dispatch', 'users', 'create', 'Create new users', 'Grants the ability to create new users.'),
('dispatch', 'users', 'read',   'View user info',   'Grants the ability to view user information.'),
('dispatch', 'users', 'update', 'Modify user info', 'Grants the ability to modify user information.'),
('dispatch', 'users', 'delete', 'Delete users',     'Grants the ability to delete users.');
