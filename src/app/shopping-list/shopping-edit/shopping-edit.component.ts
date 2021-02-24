import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('form', {static: false}) shoppingEditForm!: NgForm;
  private subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedIngredient!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedIngredient = this.shoppingListService.getIngredient(this.editedItemIndex);
      this.shoppingEditForm.setValue({
        name: this.editedIngredient.name,
        amount: this.editedIngredient.amount
      });
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(
      value.name,
      value.amount
    );
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    }else
      this.shoppingListService.addIngredient(ingredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
