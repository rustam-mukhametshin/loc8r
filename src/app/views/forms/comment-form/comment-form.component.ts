import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { finalize, first } from 'rxjs/operators';
import { Review } from '../../../models/Review';
import { LoadingService } from '../../../services/loading.service';
import { Subject, Subscription } from 'rxjs';
import { LocationService } from '../../../services/location.service';
import { Location } from '../../../models/Location';
import { AuthenticationService } from '../../../services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormChangeService } from '../../../services/form-change.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup;

  rSub: Subscription;
  private subject: Subject<void> = new Subject<void>();

  @Input() location: Location;
  @Input() formVisible = false;
  @Output() changeFormVisibility = new EventEmitter<boolean>();

  constructor(
    private dataService: LocationService,
    private authenticationService: AuthenticationService,
    private loadingService: LoadingService,
    private formChangeService: FormChangeService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initFormChangesSub();
  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe();
    }
    this.subject.next();
    this.subject.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.form.controls.author.setValue(this.getUsername());
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

  private initFormChangesSub(): void {
    this.form.controls.reviewText.valueChanges
      .pipe(
        first()
      )
      .subscribe(_ => this.formChangeService.onFormChanged());
  }

  onReviewSubmit() {

    if (this.form.valid) {
      this.loadingService.loadingOn();

      this.rSub = this.dataService
        .addReviewByLocationId(this.location._id, this.form.value)
        .pipe(
          finalize(() => this.loadingService.loadingOff())
        )
        .subscribe((review: Review) => {

          this.location.reviews = [
            review,
            ...this.location.reviews
          ];

          this.changeFormVisibility.emit(false);
          this.formVisible = false;
        })
      ;
    }
  }

  /**
   * Get username
   */
  private getUsername(): string {
    const {name} = this.authenticationService.getCurrentUser();
    return name ?? 'Guest';
  }
}