package com.tathyfestas.infrastructure.repository;

import com.tathyfestas.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long> {
}
