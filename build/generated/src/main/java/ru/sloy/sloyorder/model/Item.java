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
 * Позиция меню
 */

@Schema(name = "Item", description = "Позиция меню")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class Item implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("itemName")
  private String itemName;

  @JsonProperty("itemId")
  private Integer itemId;

  @JsonProperty("itemCost")
  private Integer itemCost;

  @JsonProperty("itemCategory")
  private String itemCategory;

  @JsonProperty("isAvailable")
  private Boolean isAvailable;

  public Item itemName(String itemName) {
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

  public Item itemId(Integer itemId) {
    this.itemId = itemId;
    return this;
  }

  /**
   * Get itemId
   * @return itemId
  */
  @NotNull 
  @Schema(name = "itemId", required = true)
  public Integer getItemId() {
    return itemId;
  }

  public void setItemId(Integer itemId) {
    this.itemId = itemId;
  }

  public Item itemCost(Integer itemCost) {
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

  public Item itemCategory(String itemCategory) {
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

  public Item isAvailable(Boolean isAvailable) {
    this.isAvailable = isAvailable;
    return this;
  }

  /**
   * Get isAvailable
   * @return isAvailable
  */
  @NotNull 
  @Schema(name = "isAvailable", required = true)
  public Boolean getIsAvailable() {
    return isAvailable;
  }

  public void setIsAvailable(Boolean isAvailable) {
    this.isAvailable = isAvailable;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Item item = (Item) o;
    return Objects.equals(this.itemName, item.itemName) &&
        Objects.equals(this.itemId, item.itemId) &&
        Objects.equals(this.itemCost, item.itemCost) &&
        Objects.equals(this.itemCategory, item.itemCategory) &&
        Objects.equals(this.isAvailable, item.isAvailable);
  }

  @Override
  public int hashCode() {
    return Objects.hash(itemName, itemId, itemCost, itemCategory, isAvailable);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Item {\n");
    sb.append("    itemName: ").append(toIndentedString(itemName)).append("\n");
    sb.append("    itemId: ").append(toIndentedString(itemId)).append("\n");
    sb.append("    itemCost: ").append(toIndentedString(itemCost)).append("\n");
    sb.append("    itemCategory: ").append(toIndentedString(itemCategory)).append("\n");
    sb.append("    isAvailable: ").append(toIndentedString(isAvailable)).append("\n");
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

