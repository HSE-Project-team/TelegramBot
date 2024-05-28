/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (6.2.1).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package ru.sloy.sloyorder.endpoint;

import ru.sloy.sloyorder.model.Catalog;
import ru.sloy.sloyorder.model.RawItem;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.annotation.Generated;

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
@Validated
@Tag(name = "Catalog", description = "the Catalog API")
public interface CatalogApi {

    /**
     * POST /сatalog
     *
     * @param rawItem  (required)
     * @return Успех, возвращаем присвоенный itemId (status code 200)
     *         or Чё то пошло не так (status code 400)
     */
    @Operation(
        operationId = "addItem",
        tags = { "Catalog" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Успех, возвращаем присвоенный itemId", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = Integer.class))
            }),
            @ApiResponse(responseCode = "400", description = "Чё то пошло не так", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/сatalog",
        produces = { "application/json;charset=UTF-8" },
        consumes = { "application/json;charset=UTF-8" }
    )
    ResponseEntity<Integer> addItem(
        @Parameter(name = "RawItem", description = "", required = true) @Valid @RequestBody RawItem rawItem
    );


    /**
     * DELETE /catalog/{id}
     *
     * @param id  (required)
     * @return Успех (status code 200)
     *         or Чё то пошло не так (status code 400)
     */
    @Operation(
        operationId = "deleteItemById",
        tags = { "Catalog" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Успех"),
            @ApiResponse(responseCode = "400", description = "Чё то пошло не так", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.DELETE,
        value = "/catalog/{id}",
        produces = { "application/json;charset=UTF-8" }
    )
    ResponseEntity<Void> deleteItemById(
        @Parameter(name = "id", description = "", required = true) @PathVariable("id") Integer id
    );


    /**
     * GET /catalog/categories/{category}
     *
     * @param category  (required)
     * @return Успех (status code 200)
     *         or Чё то пошло не так (status code 400)
     */
    @Operation(
        operationId = "getCatalogByCategory",
        tags = { "Catalog" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Успех", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = Catalog.class))
            }),
            @ApiResponse(responseCode = "400", description = "Чё то пошло не так", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/catalog/categories/{category}",
        produces = { "application/json;charset=UTF-8" }
    )
    ResponseEntity<Catalog> getCatalogByCategory(
        @Parameter(name = "category", description = "", required = true) @PathVariable("category") String category
    );


    /**
     * GET /catalog/categories
     *
     * @return Успех (status code 200)
     *         or Чё то пошло не так (status code 400)
     */
    @Operation(
        operationId = "getCategories",
        tags = { "Catalog" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Успех", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            }),
            @ApiResponse(responseCode = "400", description = "Чё то пошло не так", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/catalog/categories",
        produces = { "application/json;charset=UTF-8" }
    )
    ResponseEntity<List<String>> getCategories(
        
    );


    /**
     * GET /сatalog
     *
     * @return Успех (status code 200)
     *         or Чё то пошло не так (status code 400)
     */
    @Operation(
        operationId = "getFullCatalog",
        tags = { "Catalog" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Успех", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = Catalog.class))
            }),
            @ApiResponse(responseCode = "400", description = "Чё то пошло не так", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/сatalog",
        produces = { "application/json;charset=UTF-8" }
    )
    ResponseEntity<Catalog> getFullCatalog(
        
    );

}
