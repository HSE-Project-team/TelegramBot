package ru.sloy.sloyorder.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import java.util.ArrayList;
import java.util.List;
import java.io.Serializable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * Доступные для заказа времена в секундах от начала дня
 */

@Schema(name = "AvaliableTimes", description = "Доступные для заказа времена в секундах от начала дня")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class AvaliableTimes implements Serializable {

  private static final long serialVersionUID = 1L;

  @JsonProperty("times")
  @Valid
  private List<Integer> times = new ArrayList<>();

  public AvaliableTimes times(List<Integer> times) {
    this.times = times;
    return this;
  }

  public AvaliableTimes addTimesItem(Integer timesItem) {
    if (this.times == null) {
      this.times = new ArrayList<>();
    }
    this.times.add(timesItem);
    return this;
  }

  /**
   * Get times
   * @return times
  */
  @NotNull 
  @Schema(name = "times", required = true)
  public List<Integer> getTimes() {
    return times;
  }

  public void setTimes(List<Integer> times) {
    this.times = times;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AvaliableTimes avaliableTimes = (AvaliableTimes) o;
    return Objects.equals(this.times, avaliableTimes.times);
  }

  @Override
  public int hashCode() {
    return Objects.hash(times);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AvaliableTimes {\n");
    sb.append("    times: ").append(toIndentedString(times)).append("\n");
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

