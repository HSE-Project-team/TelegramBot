package ru.sloy.sloyorder.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.CatalogApi;
import ru.sloy.sloyorder.model.Catalog;
import ru.sloy.sloyorder.model.RawItem;
import ru.sloy.sloyorder.service.CatalogService;

import java.util.List;

@RestController
public class CatalogApiController implements CatalogApi {

    private final CatalogService catalogService;

    public CatalogApiController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @Override
    public ResponseEntity<Integer> addItem(RawItem rawItem) {
        return ResponseEntity.ok(catalogService.addItem(rawItem));
    }

    @Override
    public ResponseEntity<Void> deleteItemById(Integer id) {
        try {
            catalogService.deleteItemById(id);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException exception) {
            System.out.println(exception.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }


    }

    @Override
    public ResponseEntity<Catalog> getCatalogByCategory(String category) {
        return ResponseEntity.ok(catalogService.getCatalogByCategory(category));
    }

    @Override
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(catalogService.getCategories());
    }

    @Override
    public ResponseEntity<Catalog> getFullCatalog() {
        return ResponseEntity.ok(catalogService.getFullCatalog());
    }
}
