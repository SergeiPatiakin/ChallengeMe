--@arg email: string
--@return id: string
--@return email: string
--@return authMethod: string
--@return passwordHash: string
--@return name: string
SELECT
    id,
    email,
    auth_method,
    password_hash,
    name
FROM
    auth_users
WHERE
    email=:email