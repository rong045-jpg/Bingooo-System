from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Bingooo CAP API"
    api_v1_prefix: str = "/api/v1"
    database_url: str = "sqlite:///./bingooo.db"
    frontend_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore", case_sensitive=False)

    @property
    def cors_origins(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origins.split(",") if origin.strip()]

settings = Settings()
