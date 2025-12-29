from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "IdealIt Test Platform"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "S3CR3T_K3Y_CH4NG3_M3_IN_PR0D" # In a real app, use env vars
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 days
    DATABASE_URL: str = "sqlite:///./database/idealit.db"

    class Config:
        env_file = ".env"

settings = Settings()
