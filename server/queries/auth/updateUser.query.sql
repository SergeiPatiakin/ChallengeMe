--@arg id: string
--@arg email: string
--@arg authMethod: string
--@arg passwordHash: string
--@arg name: string
UPDATE auth_users
SET
    email = :email,
    auth_method = :authMethod,
    password_hash = :passwordHash,
    name = :name
WHERE
    id = :id