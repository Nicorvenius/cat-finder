// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CatFiltersComponent } from './cat-filters.component';
// import { ReactiveFormsModule } from '@angular/forms';
//
// describe('CatFiltersComponent', () => {
//   let component: CatFiltersComponent;
//   let fixture: ComponentFixture<CatFiltersComponent>;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [CatFiltersComponent],
//       imports: [ReactiveFormsModule],
//     }).compileComponents();
//
//     fixture = TestBed.createComponent(CatFiltersComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });
//
//   it('should initialize form correctly', () => {
//     const filtersForm = component.filtersForm;
//     expect(filtersForm.value).toEqual({
//       selectedBreed: null,
//       resultLimit: 10
//     });
//   });
//
//   it('should submit form and trigger search', () => {
//     spyOn(component, 'onSubmit');
//     component.filtersForm.setValue({ selectedBreed: 'beng', resultLimit: 5 });
//     component.onSubmit();
//
//     expect(component.onSubmit).toHaveBeenCalled();
//   });
// });
