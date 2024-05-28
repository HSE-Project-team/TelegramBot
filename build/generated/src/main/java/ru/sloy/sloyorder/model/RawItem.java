package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.io.Serializable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Позиция меню для её добавление в меню
 */

@Schema(name = "RawItem", description = "Позиция меню для её добавление в меню")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class RawItem implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("itemName")
  private String itemName;

  @JsonProperty("itemCost")
  private Integer itemCost;

  @JsonProperty("itemCategory")
  private String itemCategory;

  public RawItem itemName(String itemName) {
    this.itemName = itemName;
    return this;
  }

  /**
   * Get itemName
   * @return itemName
  */
  @NotNull 
  @Schema(name = "itemName", required = true)
  public String getItemName() {
    return itemName;
  }

  public void setItemName(String itemName) {
    this.itemName = itemName;
  }

  public RawItem itemCost(Integer itemCost) {
    this.itemCost = itemCost;
    return this;
  }

  /**
   * Get itemCost
   * @return itemCost
  */
  @NotNull 
  @Schema(name = "itemCost", required = true)
  public Integer getItemCost() {
    return itemCost;
  }

  public void setItemCost(Integer itemCost) {
    this.itemCost = itemCost;
  }

  public RawItem itemCategory(String itemCategory) {
    this.itemCategory = itemCategory;
    return this;
  }

  /**
   * Get itemCategory
   * @return itemCategory
  */
  @NotNull 
  @Schema(name = "itemCategory", required = true)
  public String getItemCategory() {
    return itemCategory;
  }

  public void setItemCategory(String itemCategory) {
    this.itemCategory = itemCategory;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RawItem rawItem = (RawItem) o;
    return Objects.equals(this.itemName, rawItem.itemName) &&
        Objects.equals(this.itemCost, rawItem.itemCost) &&
        Objects.equals(this.itemCategory, rawItem.itemCategory);
  }

  @Override
  public int hashCode() {
    return Objects.hash(itemName, itemCost, itemCategory);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RawItem {\n");
    sb.append("    itemName: ").append(toIndentedString(itemName)).append("\n");
    sb.append("    itemCost: ").append(toIndentedString(itemCost)).append("\n");
    sb.append("    itemCategory: ").append(toIndentedString(itemCategory)).append("\n");
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

