/**
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech) (6.2.1).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
package ru.sloy.sloyorder.endpoint;

import ru.sloy.sloyorder.model.FullOrder;
import ru.sloy.sloyorder.model.RawOrder;
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
@Tag(name = "Order", description = "the Order API")
public interface OrderApi {

    /**
     * POST /order
     *
     * @param rawOrder  (required)
     * @return Успех, возвращаем orderId (status code 200)
     *         or Чё то пошло не так (status code 400)
     */
    @Operation(
        operationId = "addOrder",
        tags = { "Order" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Успех, возвращаем orderId", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = Integer.class))
            }),
            @ApiResponse(responseCode = "400", description = "Чё то пошло не так", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.POST,
        value = "/order",
        produces = { "application/json;charset=UTF-8" },
        consumes = { "application/json;charset=UTF-8" }
    )
    ResponseEntity<Integer> addOrder(
        @Parameter(name = "RawOrder", description = "", required = true) @Valid @RequestBody RawOrder rawOrder
    );


    /**
     * GET /order/{id}
     *
     * @param id  (required)
     * @return Успех (status code 200)
     *         or Чё то пошло не так (status code 400)
     */
    @Operation(
        operationId = "getOrderById",
        tags = { "Order" },
        responses = {
            @ApiResponse(responseCode = "200", description = "Успех", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = FullOrder.class))
            }),
            @ApiResponse(responseCode = "400", description = "Чё то пошло не так", content = {
                @Content(mediaType = "application/json;charset=UTF-8", schema = @Schema(implementation = String.class))
            })
        }
    )
    @RequestMapping(
        method = RequestMethod.GET,
        value = "/order/{id}",
        produces = { "application/json;charset=UTF-8" }
    )
    ResponseEntity<FullOrder> getOrderById(
        @Parameter(name = "id", description = "", required = true) @PathVariable("id") Integer id
    );

}
