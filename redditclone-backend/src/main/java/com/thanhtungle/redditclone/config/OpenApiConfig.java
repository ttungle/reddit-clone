package com.thanhtungle.redditclone.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.tags.Tag;

@OpenAPIDefinition(
        info = @Info(title = "Reddit Clone API", version = "1.0", description = "Clone Reddit With Spring Boot."),
        tags = {@Tag(name = "Posts", description = "Posts with id, username and subreddits."),
                @Tag(name = "Authentication", description = "Register and login user."),
                @Tag(name = "Subreddits", description = "Create and get subreddits."),
                @Tag(name = "Comments", description = "Create and get comments."),
                @Tag(name = "Votes", description = "Create and get votes."),
                @Tag(name = "Users", description = "Create and get users.")
        }
)
@SecurityScheme(name = "BearerAuth", type = SecuritySchemeType.HTTP, scheme = "bearer", bearerFormat = "JWT",
        description = "Bearer token for project authentication.")
public class OpenApiConfig {
}
