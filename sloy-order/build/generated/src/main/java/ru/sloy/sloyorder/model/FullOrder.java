package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.ArrayList;
import java.util.List;
import ru.sloy.sloyorder.model.FullOrderItemsInner;
import java.io.Serializable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Заказ для хранения заказа c Массивом пар &lt;item, itemNumber&gt;
 */

@Schema(name = "FullOrder", description = "Заказ для хранения заказа c Массивом пар <item, itemNumber>")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class FullOrder implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("time")
  private Integer time;

  @JsonProperty("userId")
  private Integer userId;

  @JsonProperty("orderId")
  private Integer orderId;

  @JsonProperty("items")
  @Valid
  private List<FullOrderItemsInner> items = new ArrayList<>();

  @JsonProperty("orderCost")
  private Integer orderCost;

  @JsonProperty("comment")
  private String comment;

  /**
   * Gets or Sets status
   */
  public enum StatusEnum {
    WAITING_FOR_PAYMENT("waiting for payment"),
    
    PAID_AND_PREPARING("paid and preparing"),
    
    READY("ready"),
    
    RECEIVED("received"),
    
    CANCELLED("cancelled");

    private String value;

    StatusEnum(String value) {
      this.value = value;
    }

    @JsonValue
    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    @JsonCreator
    public static StatusEnum fromValue(String value) {
      for (StatusEnum b : StatusEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }
  }

  @JsonProperty("status")
  private StatusEnum status;

  public FullOrder time(Integer time) {
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

  public FullOrder userId(Integer userId) {
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

  public FullOrder orderId(Integer orderId) {
    this.orderId = orderId;
    return this;
  }

  /**
   * Get orderId
   * @return orderId
  */
  @NotNull 
  @Schema(name = "orderId", required = true)
  public Integer getOrderId() {
    return orderId;
  }

  public void setOrderId(Integer orderId) {
    this.orderId = orderId;
  }

  public FullOrder items(List<FullOrderItemsInner> items) {
    this.items = items;
    return this;
  }

  public FullOrder addItemsItem(FullOrderItemsInner itemsItem) {
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
  public List<FullOrderItemsInner> getItems() {
    return items;
  }

  public void setItems(List<FullOrderItemsInner> items) {
    this.items = items;
  }

  public FullOrder orderCost(Integer orderCost) {
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

  public FullOrder comment(String comment) {
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

  public FullOrder status(StatusEnum status) {
    this.status = status;
    return this;
  }

  /**
   * Get status
   * @return status
  */
  @NotNull 
  @Schema(name = "status", required = true)
  public StatusEnum getStatus() {
    return status;
  }

  public void setStatus(StatusEnum status) {
    this.status = status;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    FullOrder fullOrder = (FullOrder) o;
    return Objects.equals(this.time, fullOrder.time) &&
        Objects.equals(this.userId, fullOrder.userId) &&
        Objects.equals(this.orderId, fullOrder.orderId) &&
        Objects.equals(this.items, fullOrder.items) &&
        Objects.equals(this.orderCost, fullOrder.orderCost) &&
        Objects.equals(this.comment, fullOrder.comment) &&
        Objects.equals(this.status, fullOrder.status);
  }

  @Override
  public int hashCode() {
    return Objects.hash(time, userId, orderId, items, orderCost, comment, status);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class FullOrder {\n");
    sb.append("    time: ").append(toIndentedString(time)).append("\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    orderId: ").append(toIndentedString(orderId)).append("\n");
    sb.append("    items: ").append(toIndentedString(items)).append("\n");
    sb.append("    orderCost: ").append(toIndentedString(orderCost)).append("\n");
    sb.append("    comment: ").append(toIndentedString(comment)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
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

