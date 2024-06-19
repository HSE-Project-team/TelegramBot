package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.io.Serializable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * RawOrderItemsInner
 */

@JsonTypeName("RawOrder_items_inner")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class RawOrderItemsInner implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("itemId")
  private Integer itemId;

  @JsonProperty("itemNumber")
  private Integer itemNumber;

  public RawOrderItemsInner itemId(Integer itemId) {
    this.itemId = itemId;
    return this;
  }

  /**
   * Get itemId
   * @return itemId
  */
  
  @Schema(name = "itemId", required = false)
  public Integer getItemId() {
    return itemId;
  }

  public void setItemId(Integer itemId) {
    this.itemId = itemId;
  }

  public RawOrderItemsInner itemNumber(Integer itemNumber) {
    this.itemNumber = itemNumber;
    return this;
  }

  /**
   * Get itemNumber
   * @return itemNumber
  */
  
  @Schema(name = "itemNumber", required = false)
  public Integer getItemNumber() {
    return itemNumber;
  }

  public void setItemNumber(Integer itemNumber) {
    this.itemNumber = itemNumber;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RawOrderItemsInner rawOrderItemsInner = (RawOrderItemsInner) o;
    return Objects.equals(this.itemId, rawOrderItemsInner.itemId) &&
        Objects.equals(this.itemNumber, rawOrderItemsInner.itemNumber);
  }

  @Override
  public int hashCode() {
    return Objects.hash(itemId, itemNumber);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RawOrderItemsInner {\n");
    sb.append("    itemId: ").append(toIndentedString(itemId)).append("\n");
    sb.append("    itemNumber: ").append(toIndentedString(itemNumber)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

