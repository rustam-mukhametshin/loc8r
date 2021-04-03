import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Review } from '../../../models/Review';
import { LoadingService } from '../../../services/loading.service';
import { Subscription } from 'rxjs';
import { LocationService } from '../../../services/location.service';
import { Location } from '../../../models/Location';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy {

  newReview: Review = {
    author: '',
    rating: 5,
    reviewText: ''
  };
  form: FormGroup;
  formError: string;

  rSub: Subscription;

  @Input() location: Location;
  @Input() formVisible = false;
  @Output() changeFormVisibility = new EventEmitter<boolean>();

  constructor(
    private dataService: LocationService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

  private initForm(): void {
    this.form = new FormGroup(
      {
        author: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ]),
        rating: new FormControl(5),
        reviewText: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(255),
        ])
      }
    );
  }

  onReviewSubmit() {
    this.formError = '';
    this.newReview.author = this.getUsername();

    if (this.formIsValid()) {
      this.loadingService.loadingOn();

      this.rSub = this.dataService
        .addReviewByLocationId(this.location._id, this.newReview)
        .pipe(
          finalize(() => this.loadingService.loadingOff())
        )
        .subscribe((review: Review) => {

          this.location.reviews = [
            review,
            ...this.location.reviews
          ];

          this.resetAndHideReviewForm();
        })
      ;
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  /**
   * Get username
   */
  getUsername(): string {
    const {name} = this.authenticationService.getCurrentUser();
    return name ?? 'Guest';
  }

  private formIsValid(): boolean {
    return !!(this.newReview.author && this.newReview.rating && this.newReview.reviewText);
  }

  /**
   * Reset form values
   *
   * @private
   */
  private resetAndHideReviewForm(): void {
    this.changeFormVisibility.emit(false);
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
  }
}
