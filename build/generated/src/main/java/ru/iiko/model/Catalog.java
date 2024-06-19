package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
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
 * Меню
 */

@Schema(name = "Catalog", description = "Меню")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class Catalog implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("size")
  private Integer size;

  @JsonProperty("items")
  @Valid
  private List<Item> items = new ArrayList<>();

  public Catalog size(Integer size) {
    this.size = size;
    return this;
  }

  /**
   * Get size
   * @return size
  */
  @NotNull 
  @Schema(name = "size", required = true)
  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = size;
  }

  public Catalog items(List<Item> items) {
    this.items = items;
    return this;
  }

  public Catalog addItemsItem(Item itemsItem) {
    if (this.items == null) {
      this.items = new ArrayList<>();
    }
    this.items.add(itemsItem);
    return this;
  }

  /**
   * Get items
   * @return items
  */
  @NotNull @Valid 
  @Schema(name = "items", required = true)
  public List<Item> getItems() {
    return items;
  }

  public void setItems(List<Item> items) {
    this.items = items;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Catalog catalog = (Catalog) o;
    return Objects.equals(this.size, catalog.size) &&
        Objects.equals(this.items, catalog.items);
  }

  @Override
  public int hashCode() {
    return Objects.hash(size, items);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Catalog {\n");
    sb.append("    size: ").append(toIndentedString(size)).append("\n");
    sb.append("    items: ").append(toIndentedString(items)).append("\n");
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

