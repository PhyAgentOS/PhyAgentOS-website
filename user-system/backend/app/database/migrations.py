from sqlalchemy.engine import Engine


def ensure_user_schema_compatibility(engine: Engine) -> None:
    if engine.dialect.name == "sqlite":
        _ensure_sqlite_user_schema(engine)
    elif engine.dialect.name == "postgresql":
        _ensure_postgresql_user_schema(engine)


def _ensure_sqlite_user_schema(engine: Engine) -> None:
    with engine.begin() as connection:
        columns = connection.exec_driver_sql("PRAGMA table_info(users)").mappings().all()
        if not columns:
            return

        column_names = {column["name"] for column in columns}
        email_column = next((column for column in columns if column["name"] == "email"), None)
        email_is_required = bool(email_column and email_column["notnull"])
        has_phone_verified = "phone_verified" in column_names

        if not has_phone_verified and not email_is_required:
            connection.exec_driver_sql(
                "ALTER TABLE users ADD COLUMN phone_verified BOOLEAN NOT NULL DEFAULT 1"
            )
            return

        if not email_is_required:
            return

        phone_verified_expr = "phone_verified" if has_phone_verified else "1"
        connection.exec_driver_sql("PRAGMA foreign_keys=OFF")
        connection.exec_driver_sql(
            """
            CREATE TABLE users_new (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                username VARCHAR(64) NOT NULL UNIQUE,
                phone VARCHAR(32) NOT NULL UNIQUE,
                email VARCHAR(255) UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                phone_verified BOOLEAN NOT NULL DEFAULT 1,
                status VARCHAR(20) NOT NULL,
                created_at DATETIME NOT NULL,
                updated_at DATETIME NOT NULL
            )
            """
        )
        connection.exec_driver_sql(
            f"""
            INSERT INTO users_new (
                id,
                username,
                phone,
                email,
                password_hash,
                phone_verified,
                status,
                created_at,
                updated_at
            )
            SELECT
                id,
                username,
                phone,
                NULLIF(email, ''),
                password_hash,
                {phone_verified_expr},
                status,
                created_at,
                updated_at
            FROM users
            """
        )
        connection.exec_driver_sql("DROP TABLE users")
        connection.exec_driver_sql("ALTER TABLE users_new RENAME TO users")
        connection.exec_driver_sql("CREATE INDEX ix_users_id ON users (id)")
        connection.exec_driver_sql("CREATE UNIQUE INDEX ix_users_username ON users (username)")
        connection.exec_driver_sql("CREATE UNIQUE INDEX ix_users_phone ON users (phone)")
        connection.exec_driver_sql("CREATE UNIQUE INDEX ix_users_email ON users (email)")
        connection.exec_driver_sql("PRAGMA foreign_keys=ON")


def _ensure_postgresql_user_schema(engine: Engine) -> None:
    with engine.begin() as connection:
        connection.exec_driver_sql(
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS phone_verified BOOLEAN NOT NULL DEFAULT TRUE"
        )
        connection.exec_driver_sql("ALTER TABLE users ALTER COLUMN email DROP NOT NULL")
