package ru.sloy.sloyorder.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import ru.sloy.sloyorder.endpoint.CatalogApi;
import ru.sloy.sloyorder.model.Catalog;
import ru.sloy.sloyorder.model.RawItem;
import ru.sloy.sloyorder.service.CatalogService;

import java.util.List;

@RestController
@CrossOrigin
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
        catalogService.deleteItemById(id);
        return ResponseEntity.noContent().build();
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