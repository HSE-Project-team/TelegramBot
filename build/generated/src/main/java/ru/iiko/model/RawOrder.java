package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.ArrayList;
import java.util.List;
import ru.sloy.sloyorder.model.RawOrderItemsInner;
import java.io.Serializable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * RawOrder
 */

@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class RawOrder implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("time")
  private Integer time;

  @JsonProperty("userId")
  private Integer userId;

  @JsonProperty("items")
  @Valid
  private List<RawOrderItemsInner> items = new ArrayList<>();

  @JsonProperty("orderCost")
  private Integer orderCost;

  @JsonProperty("comment")
  private String comment;

  public RawOrder time(Integer time) {
    this.time = time;
    return this;
  }

  /**
   * Get time
   * @return time
  */
  @NotNull 
  @Schema(name = "time", required = true)
  public Integer getTime() {
    return time;
  }

  public void setTime(Integer time) {
    this.time = time;
  }

  public RawOrder userId(Integer userId) {
    this.userId = userId;
    return this;
  }

  /**
   * Get userId
   * @return userId
  */
  @NotNull 
  @Schema(name = "userId", required = true)
  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public RawOrder items(List<RawOrderItemsInner> items) {
    this.items = items;
    return this;
  }

  public RawOrder addItemsItem(RawOrderItemsInner itemsItem) {
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
  public List<RawOrderItemsInner> getItems() {
    return items;
  }

  public void setItems(List<RawOrderItemsInner> items) {
    this.items = items;
  }

  public RawOrder orderCost(Integer orderCost) {
    this.orderCost = orderCost;
    return this;
  }

  /**
   * Get orderCost
   * @return orderCost
  */
  @NotNull 
  @Schema(name = "orderCost", required = true)
  public Integer getOrderCost() {
    return orderCost;
  }

  public void setOrderCost(Integer orderCost) {
    this.orderCost = orderCost;
  }

  public RawOrder comment(String comment) {
    this.comment = comment;
    return this;
  }

  /**
   * Get comment
   * @return comment
  */
  @NotNull 
  @Schema(name = "comment", required = true)
  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RawOrder rawOrder = (RawOrder) o;
    return Objects.equals(this.time, rawOrder.time) &&
        Objects.equals(this.userId, rawOrder.userId) &&
        Objects.equals(this.items, rawOrder.items) &&
        Objects.equals(this.orderCost, rawOrder.orderCost) &&
        Objects.equals(this.comment, rawOrder.comment);
  }

  @Override
  public int hashCode() {
    return Objects.hash(time, userId, items, orderCost, comment);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RawOrder {\n");
    sb.append("    time: ").append(toIndentedString(time)).append("\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    items: ").append(toIndentedString(items)).append("\n");
    sb.append("    orderCost: ").append(toIndentedString(orderCost)).append("\n");
    sb.append("    comment: ").append(toIndentedString(comment)).append("\n");
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

