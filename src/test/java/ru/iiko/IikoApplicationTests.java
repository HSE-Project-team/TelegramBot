package ru.iiko;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import ru.iiko.mapping.JsonMapper;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IikoApplicationTests {

	@Autowired
	private TestRestTemplate restTemplate;

	@Test
	void contextLoads() {
	}

	@Test
	void testGetOrder() {
		ResponseEntity<String> response = restTemplate.getForEntity("/iiko/testOrder", String.class);
		assertThat(response.getStatusCodeValue()).isEqualTo(200);
	}

	@Test
	void testCreateOrder() {
		String requestBody = "{\n" +
				"  \"items\": [\n" +
				"    {\n" +
				"      \"itemId\": \"d97c066c-0a83-49c8-a79b-cf6ec9a4d366\",\n" +
				"      \"itemNumber\": 0\n" +
				"    }\n" +
				"  ],\n" +
				"  \"id\": 0,\n" +
				"  \"comment\": \"Тестовый заказ, не делать!!!\",\n" +
				"  \"time\": \"2024-06-20 23:59:59.999\"\n" +
				"}";
		ResponseEntity<String> response = restTemplate.postForEntity("/iiko/createOrder", requestBody, String.class);
		assertThat(response.getStatusCodeValue()).isEqualTo(200);
	}

	@Test
	void testGetStatus() {
		String createOrderRequest = "{\n" +
				"  \"items\": [\n" +
				"    {\n" +
				"      \"itemId\": \"d97c066c-0a83-49c8-a79b-cf6ec9a4d366\",\n" +
				"      \"itemNumber\": 0\n" +
				"    }\n" +
				"  ],\n" +
				"  \"id\": 0,\n" +
				"  \"comment\": \"Тестовый заказ, не делать!!!\",\n" +
				"  \"time\": \"2024-06-20 23:59:59.999\"\n" +
				"}";

		ResponseEntity<String> createOrderResponse = restTemplate.postForEntity("/iiko/createOrder", createOrderRequest, String.class);
		assertThat(createOrderResponse.getStatusCodeValue()).isEqualTo(200);

		String orderId = JsonMapper.jsonToId(createOrderResponse.getBody());

		ResponseEntity<String> getStatusResponse = restTemplate.getForEntity("/iiko/getStatus?id={orderId}", String.class, orderId);
		assertThat(getStatusResponse.getStatusCodeValue()).isEqualTo(200);
	}

}
