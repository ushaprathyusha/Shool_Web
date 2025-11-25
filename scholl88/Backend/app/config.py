from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "mysql+pymysql://root:root@localhost/school_db"
    APP_NAME: str = "School Management System"

settings = Settings()
