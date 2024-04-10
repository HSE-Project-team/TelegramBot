package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.ArrayList;
import java.util.List;
import ru.sloy.sloyorder.model.Item;
import java.io.Serializable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * FullOrderItemsInner
 */

@JsonTypeName("FullOrder_items_inner")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class FullOrderItemsInner implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("item")
  @Valid
  private List<Item> item = null;

  @JsonProperty("itemNumber")
  private Integer itemNumber;

  public FullOrderItemsInner item(List<Item> item) {
    this.item = item;
    return this;
  }

  public FullOrderItemsInner addItemItem(Item itemItem) {
    if (this.item == null) {
      this.item = new ArrayList<>();
    }
    this.item.add(itemItem);
    return this;
  }

  /**
   * Get item
   * @return item
  */
  @Valid 
  @Schema(name = "item", required = false)
  public List<Item> getItem() {
    return item;
  }

  public void setItem(List<Item> item) {
    this.item = item;
  }

  public FullOrderItemsInner itemNumber(Integer itemNumber) {
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
    FullOrderItemsInner fullOrderItemsInner = (FullOrderItemsInner) o;
    return Objects.equals(this.item, fullOrderItemsInner.item) &&
        Objects.equals(this.itemNumber, fullOrderItemsInner.itemNumber);
  }

  @Override
  public int hashCode() {
    return Objects.hash(item, itemNumber);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class FullOrderItemsInner {\n");
    sb.append("    item: ").append(toIndentedString(item)).append("\n");
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

