package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.ArrayList;
import java.util.List;
import ru.sloy.sloyorder.model.FullOrder;
import java.io.Serializable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Пользователь
 */

@Schema(name = "User", description = "Пользователь")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class User implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("user_id")
  private Integer userId;

  @JsonProperty("orders")
  @Valid
  private List<FullOrder> orders = new ArrayList<>();

  public User userId(Integer userId) {
    this.userId = userId;
    return this;
  }

  /**
   * Get userId
   * @return userId
  */
  
  @Schema(name = "user_id", required = false)
  public Integer getUserId() {
    return userId;
  }

  public void setUserId(Integer userId) {
    this.userId = userId;
  }

  public User orders(List<FullOrder> orders) {
    this.orders = orders;
    return this;
  }

  public User addOrdersItem(FullOrder ordersItem) {
    if (this.orders == null) {
      this.orders = new ArrayList<>();
    }
    this.orders.add(ordersItem);
    return this;
  }

  /**
   * Get orders
   * @return orders
  */
  @NotNull @Valid 
  @Schema(name = "orders", required = true)
  public List<FullOrder> getOrders() {
    return orders;
  }

  public void setOrders(List<FullOrder> orders) {
    this.orders = orders;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    User user = (User) o;
    return Objects.equals(this.userId, user.userId) &&
        Objects.equals(this.orders, user.orders);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, orders);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class User {\n");
    sb.append("    userId: ").append(toIndentedString(userId)).append("\n");
    sb.append("    orders: ").append(toIndentedString(orders)).append("\n");
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

