import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
    })
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(
      value.name,
      value.amount
    );
    this.shoppingListService.addIngredient(ingredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
