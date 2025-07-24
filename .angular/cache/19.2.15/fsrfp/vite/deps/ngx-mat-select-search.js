import './chunk-T77OVOND.js';
import { MatTooltip } from './chunk-IEVFHDJT.js';
import { MatProgressSpinner } from './chunk-BP2GBVP6.js';
import './chunk-LJSPUIJQ.js';
import { MatSelect } from './chunk-K42JFZP3.js';
import './chunk-NUVE4NLQ.js';
import { MatIcon } from './chunk-QZ7ZRSUV.js';
import './chunk-DTDSM6HR.js';
import './chunk-O5IRBPO4.js';
import './chunk-O6CVLKZ2.js';
import { MatCheckbox } from './chunk-JV2RCSXR.js';
import './chunk-XY3YD4BN.js';
import './chunk-FDVYMVQ4.js';
import './chunk-PDRZCS2E.js';
import './chunk-APQGW44Y.js';
import './chunk-R4QB32YE.js';
import './chunk-CQCKY7W7.js';
import './chunk-577TTFH2.js';
import { MatButtonModule, MatIconButton } from './chunk-LJIQOS5I.js';
import './chunk-PFE4DTPH.js';
import { MatDivider } from './chunk-Y6INRN5A.js';
import './chunk-NKM73PB6.js';
import { MatFormField } from './chunk-7DFONVNF.js';
import './chunk-IXEVHMJP.js';
import {
  DefaultValueAccessor,
  FormControl,
  FormControlDirective,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  ReactiveFormsModule,
} from './chunk-WXKJKQEY.js';
import { MatOption } from './chunk-GTPN7CDF.js';
import './chunk-2U6R5QTR.js';
import './chunk-YE2P3HHV.js';
import './chunk-WZRATIYN.js';
import './chunk-OIBNGD5S.js';
import './chunk-3HDMKNHX.js';
import './chunk-WNGU3QLI.js';
import './chunk-6K32XFRM.js';
import './chunk-IBJRQVUD.js';
import './chunk-BS4LDW6B.js';
import './chunk-42FJBLFI.js';
import './chunk-JXBCBRYI.js';
import { ViewportRuler } from './chunk-2N4M46HE.js';
import './chunk-HYIG2K5W.js';
import './chunk-2O4WY5GE.js';
import './chunk-PQSRNTO7.js';
import './chunk-5RHDU2BP.js';
import './chunk-RG7RHNTG.js';
import './chunk-HNGPX6GY.js';
import './chunk-GWH5ZIVQ.js';
import './chunk-FSIK44TS.js';
import { AsyncPipe } from './chunk-LJRMVWU3.js';
import './chunk-SOO5Y25R.js';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  ViewChild,
  forwardRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery,
} from './chunk-LB7E77GG.js';
import './chunk-PEBH6BBU.js';
import './chunk-WPM5VTLQ.js';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  delay,
  filter,
  map,
  of,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
} from './chunk-4S3KYZTJ.js';
import './chunk-4MWRP73S.js';

// node_modules/ngx-mat-select-search/fesm2022/ngx-mat-select-search.mjs
var _c0 = ['searchSelectInput'];
var _c1 = ['innerSelectSearch'];
var _c2 = [
  [['', 8, 'mat-select-search-custom-header-content']],
  [['', 'ngxMatSelectSearchClear', '']],
  [['', 'ngxMatSelectNoEntriesFound', '']],
];
var _c3 = ['.mat-select-search-custom-header-content', '[ngxMatSelectSearchClear]', '[ngxMatSelectNoEntriesFound]'];
function MatSelectSearchComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, 'mat-checkbox', 10);
    ɵɵlistener(
      'change',
      function MatSelectSearchComponent_Conditional_4_Template_mat_checkbox_change_0_listener($event) {
        ɵɵrestoreView(_r2);
        const ctx_r2 = ɵɵnextContext();
        return ɵɵresetView(ctx_r2._emitSelectAllBooleanToParent($event.checked));
      },
    );
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵproperty('color', ctx_r2.matFormField == null ? null : ctx_r2.matFormField.color)(
      'checked',
      ctx_r2.toggleAllCheckboxChecked,
    )('indeterminate', ctx_r2.toggleAllCheckboxIndeterminate)('matTooltip', ctx_r2.toggleAllCheckboxTooltipMessage)(
      'matTooltipPosition',
      ctx_r2.toggleAllCheckboxTooltipPosition,
    );
  }
}
function MatSelectSearchComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, 'mat-spinner', 7);
  }
}
function MatSelectSearchComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1);
  }
}
function MatSelectSearchComponent_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, 'mat-icon', 12);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵproperty('svgIcon', ctx_r2.closeSvgIcon);
  }
}
function MatSelectSearchComponent_Conditional_8_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, 'mat-icon');
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵtextInterpolate1(' ', ctx_r2.closeIcon, ' ');
  }
}
function MatSelectSearchComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, 'button', 11);
    ɵɵlistener('click', function MatSelectSearchComponent_Conditional_8_Template_button_click_0_listener() {
      ɵɵrestoreView(_r4);
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2._reset(true));
    });
    ɵɵtemplate(1, MatSelectSearchComponent_Conditional_8_Conditional_1_Template, 1, 0)(
      2,
      MatSelectSearchComponent_Conditional_8_Conditional_2_Template,
      1,
      1,
      'mat-icon',
      12,
    )(3, MatSelectSearchComponent_Conditional_8_Conditional_3_Template, 2, 1, 'mat-icon');
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r2.clearIcon ? 1 : ctx_r2.closeSvgIcon ? 2 : 3);
  }
}
function MatSelectSearchComponent_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2);
  }
}
function MatSelectSearchComponent_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext(2);
    ɵɵtextInterpolate1(' ', ctx_r2.noEntriesFoundLabel, ' ');
  }
}
function MatSelectSearchComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, 'div', 9);
    ɵɵtemplate(1, MatSelectSearchComponent_Conditional_11_Conditional_1_Template, 1, 0)(
      2,
      MatSelectSearchComponent_Conditional_11_Conditional_2_Template,
      1,
      1,
    );
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r2.noEntriesFound ? 1 : 2);
  }
}
var MatSelectSearchClearDirective = class _MatSelectSearchClearDirective {
  static ɵfac = function MatSelectSearchClearDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSelectSearchClearDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatSelectSearchClearDirective,
    selectors: [['', 'ngxMatSelectSearchClear', '']],
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      MatSelectSearchClearDirective,
      [
        {
          type: Directive,
          args: [
            {
              selector: '[ngxMatSelectSearchClear]',
            },
          ],
        },
      ],
      null,
      null,
    );
})();
var configurableDefaultOptions = [
  'ariaLabel',
  'clearSearchInput',
  'closeIcon',
  'closeSvgIcon',
  'disableInitialFocus',
  'disableScrollToActiveOnOptionsChanged',
  'enableClearOnEscapePressed',
  'hideClearSearchButton',
  'noEntriesFoundLabel',
  'placeholderLabel',
  'preventHomeEndKeyPropagation',
  'searching',
];
var MAT_SELECTSEARCH_DEFAULT_OPTIONS = new InjectionToken('mat-selectsearch-default-options');
var MatSelectNoEntriesFoundDirective = class _MatSelectNoEntriesFoundDirective {
  static ɵfac = function MatSelectNoEntriesFoundDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSelectNoEntriesFoundDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MatSelectNoEntriesFoundDirective,
    selectors: [['', 'ngxMatSelectNoEntriesFound', '']],
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      MatSelectNoEntriesFoundDirective,
      [
        {
          type: Directive,
          args: [
            {
              selector: '[ngxMatSelectNoEntriesFound]',
            },
          ],
        },
      ],
      null,
      null,
    );
})();
var MatSelectSearchComponent = class _MatSelectSearchComponent {
  matSelect;
  changeDetectorRef;
  _viewportRuler;
  matOption;
  matFormField;
  /** Label of the search placeholder */
  placeholderLabel = 'Suche';
  /** Type of the search input field */
  type = 'text';
  /** Font-based icon used for displaying Close-Icon */
  closeIcon = 'close';
  /** SVG-based icon used for displaying Close-Icon. If set, closeIcon is overridden */
  closeSvgIcon;
  /** Label to be shown when no entries are found. Set to null if no message should be shown. */
  noEntriesFoundLabel = 'Keine Optionen gefunden';
  /**
   * Whether the search field should be cleared after the dropdown menu is closed.
   * Useful for server-side filtering. See [#3](https://github.com/bithost-gmbh/ngx-mat-select-search/issues/3)
   */
  clearSearchInput = true;
  /** Whether to show the search-in-progress indicator */
  searching = false;
  /** Disables initial focusing of the input field */
  disableInitialFocus = false;
  /** Enable clear input on escape pressed */
  enableClearOnEscapePressed = false;
  /**
   * Prevents home / end key being propagated to mat-select,
   * allowing to move the cursor within the search input instead of navigating the options
   */
  preventHomeEndKeyPropagation = false;
  /** Disables scrolling to active options when option list changes. Useful for server-side search */
  disableScrollToActiveOnOptionsChanged = false;
  /** Adds 508 screen reader support for search box */
  ariaLabel = 'dropdown search';
  /** Whether to show Select All Checkbox (for mat-select[multi=true]) */
  showToggleAllCheckbox = false;
  /** Select all checkbox checked state */
  toggleAllCheckboxChecked = false;
  /** select all checkbox indeterminate state */
  toggleAllCheckboxIndeterminate = false;
  /** Display a message in a tooltip on the toggle-all checkbox */
  toggleAllCheckboxTooltipMessage = '';
  /** Define the position of the tooltip on the toggle-all checkbox. */
  toggleAllCheckboxTooltipPosition = 'below';
  /** Show/Hide the search clear button of the search input */
  hideClearSearchButton = false;
  /**
   * Always restore selected options on selectionChange for mode multi (e.g. for lazy loading/infinity scrolling).
   * Defaults to false, so selected options are only restored while filtering is active.
   */
  alwaysRestoreSelectedOptionsMulti = false;
  /**
   * Recreate array of selected values for multi-selects.
   *
   * This is useful if the selected values are stored in an immutable data structure.
   */
  recreateValuesArray = false;
  /** Output emitter to send to parent component with the toggle all boolean */
  toggleAll = new EventEmitter();
  /** Reference to the search input field */
  searchSelectInput;
  /** Reference to the search input field */
  innerSelectSearch;
  /** Reference to custom search input clear icon */
  clearIcon;
  /** Reference to custom no entries found element */
  noEntriesFound;
  /** Current search value */
  get value() {
    return this._formControl.value;
  }
  _lastExternalInputValue;
  onTouched = () => {};
  /** Reference to the MatSelect options */
  set _options(_options) {
    this._options$.next(_options);
  }
  get _options() {
    return this._options$.getValue();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _options$ = new BehaviorSubject(null);
  optionsList$ = this._options$.pipe(
    switchMap((_options) =>
      _options
        ? _options.changes.pipe(
            map((options) => options.toArray()),
            startWith(_options.toArray()),
          )
        : of(null),
    ),
  );
  optionsLength$ = this.optionsList$.pipe(map((options) => (options ? options.length : 0)));
  /** Previously selected values when using <mat-select [multiple]="true">*/
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  previousSelectedValues;
  _formControl = new FormControl('', {
    nonNullable: true,
  });
  /** Whether to show the no entries found message */
  _showNoEntriesFound$ = combineLatest([this._formControl.valueChanges, this.optionsLength$]).pipe(
    map(
      ([value, optionsLength]) =>
        !!(this.noEntriesFoundLabel && value && optionsLength === this.getOptionsLengthOffset()),
    ),
  );
  /** Subject that emits when the component has been destroyed. */
  _onDestroy = new Subject();
  /** Reference to active descendant for ARIA Support. */
  activeDescendant;
  constructor(matSelect, changeDetectorRef, _viewportRuler, matOption, matFormField, defaultOptions) {
    this.matSelect = matSelect;
    this.changeDetectorRef = changeDetectorRef;
    this._viewportRuler = _viewportRuler;
    this.matOption = matOption;
    this.matFormField = matFormField;
    this.applyDefaultOptions(defaultOptions);
  }
  applyDefaultOptions(defaultOptions) {
    if (!defaultOptions) {
      return;
    }
    for (const key of configurableDefaultOptions) {
      if (Object.prototype.hasOwnProperty.call(defaultOptions, key)) {
        this[key] = defaultOptions[key];
      }
    }
  }
  ngOnInit() {
    if (this.matOption) {
      this.matOption.disabled = true;
      this.matOption._getHostElement().classList.add('contains-mat-select-search');
      this.matOption._getHostElement().setAttribute('role', 'presentation');
    } else {
      console.error('<ngx-mat-select-search> must be placed inside a <mat-option> element');
    }
    this.matSelect.openedChange.pipe(delay(1), takeUntil(this._onDestroy)).subscribe((opened) => {
      if (opened) {
        this.updateInputWidth();
        if (!this.disableInitialFocus) {
          this._focus();
        }
      } else {
        if (this.clearSearchInput) {
          this._reset();
        }
      }
    });
    this.matSelect.openedChange
      .pipe(
        take(1),
        switchMap(() => {
          this._options = this.matSelect.options;
          let previousFirstOption = this._options.toArray()[this.getOptionsLengthOffset()];
          return this._options.changes.pipe(
            tap(() => {
              setTimeout(() => {
                const options = this._options.toArray();
                const currentFirstOption = options[this.getOptionsLengthOffset()];
                const keyManager = this.matSelect._keyManager;
                if (keyManager && this.matSelect.panelOpen && currentFirstOption) {
                  const firstOptionIsChanged =
                    !previousFirstOption ||
                    !this.matSelect.compareWith(previousFirstOption.value, currentFirstOption.value);
                  if (
                    firstOptionIsChanged ||
                    !keyManager.activeItem ||
                    !options.find((option) => this.matSelect.compareWith(option.value, keyManager.activeItem?.value))
                  ) {
                    keyManager.setActiveItem(this.getOptionsLengthOffset());
                  }
                  setTimeout(() => {
                    this.updateInputWidth();
                  });
                }
                previousFirstOption = currentFirstOption;
              });
            }),
          );
        }),
      )
      .pipe(takeUntil(this._onDestroy))
      .subscribe();
    this._showNoEntriesFound$.pipe(takeUntil(this._onDestroy)).subscribe((showNoEntriesFound) => {
      if (this.matOption) {
        if (showNoEntriesFound) {
          this.matOption._getHostElement().classList.add('mat-select-search-no-entries-found');
        } else {
          this.matOption._getHostElement().classList.remove('mat-select-search-no-entries-found');
        }
      }
    });
    this._viewportRuler
      .change()
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.matSelect.panelOpen) {
          this.updateInputWidth();
        }
      });
    this.initMultipleHandling();
    this.optionsList$.pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
  _emitSelectAllBooleanToParent(state) {
    this.toggleAll.emit(state);
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  _isToggleAllCheckboxVisible() {
    return this.matSelect.multiple && this.showToggleAllCheckbox;
  }
  /**
   * Handles the key down event with MatSelect.
   * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
   * @param event
   */
  _handleKeydown(event) {
    if (
      (event.key && event.key.length === 1) ||
      (this.preventHomeEndKeyPropagation && (event.key === 'Home' || event.key === 'End'))
    ) {
      event.stopPropagation();
    }
    if (this.matSelect.multiple && event.key && event.key === 'Enter') {
      setTimeout(() => this._focus());
    }
    if (this.enableClearOnEscapePressed && event.key === 'Escape' && this.value) {
      this._reset(true);
      event.stopPropagation();
    }
  }
  /**
   * Handles the key up event with MatSelect.
   * Allows e.g. the announcing of the currently activeDescendant by screen readers.
   */
  _handleKeyup(event) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const ariaActiveDescendantId = this.matSelect._getAriaActiveDescendant();
      const index = this._options.toArray().findIndex((item) => item.id === ariaActiveDescendantId);
      if (index !== -1) {
        this.unselectActiveDescendant();
        this.activeDescendant = this._options.toArray()[index]._getHostElement();
        this.activeDescendant.setAttribute('aria-selected', 'true');
        this.searchSelectInput.nativeElement.setAttribute('aria-activedescendant', ariaActiveDescendantId);
      }
    }
  }
  writeValue(value) {
    this._lastExternalInputValue = value;
    this._formControl.setValue(value);
    this.changeDetectorRef.markForCheck();
  }
  onBlur() {
    this.unselectActiveDescendant();
    this.onTouched();
  }
  registerOnChange(fn) {
    this._formControl.valueChanges
      .pipe(
        filter((value) => value !== this._lastExternalInputValue),
        tap(() => (this._lastExternalInputValue = void 0)),
        takeUntil(this._onDestroy),
      )
      .subscribe(fn);
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Focuses the search input field
   */
  _focus() {
    if (!this.searchSelectInput || !this.matSelect.panel) {
      return;
    }
    const panel = this.matSelect.panel.nativeElement;
    const scrollTop = panel.scrollTop;
    this.searchSelectInput.nativeElement.focus();
    panel.scrollTop = scrollTop;
  }
  /**
   * Resets the current search value
   * @param focus whether to focus after resetting
   */
  _reset(focus) {
    this._formControl.setValue('');
    if (focus) {
      this._focus();
    }
  }
  /**
   * Initializes handling <mat-select [multiple]="true">
   * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
   */
  initMultipleHandling() {
    if (!this.matSelect.ngControl) {
      if (this.matSelect.multiple) {
        console.error(
          'the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true',
        );
      }
      return;
    }
    this.previousSelectedValues = this.matSelect.ngControl.value;
    if (!this.matSelect.ngControl.valueChanges) {
      return;
    }
    this.matSelect.ngControl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe((values) => {
      let restoreSelectedValues = false;
      if (this.matSelect.multiple) {
        if (
          (this.alwaysRestoreSelectedOptionsMulti || (this._formControl.value && this._formControl.value.length)) &&
          this.previousSelectedValues &&
          Array.isArray(this.previousSelectedValues)
        ) {
          if (!values || !Array.isArray(values)) {
            values = [];
          }
          const optionValues = this.matSelect.options.map((option) => option.value);
          this.previousSelectedValues.forEach((previousValue) => {
            if (
              !values.some((v) => this.matSelect.compareWith(v, previousValue)) &&
              !optionValues.some((v) => this.matSelect.compareWith(v, previousValue))
            ) {
              if (this.recreateValuesArray) {
                values = [...values, previousValue];
              } else {
                values.push(previousValue);
              }
              restoreSelectedValues = true;
            }
          });
        }
      }
      this.previousSelectedValues = values;
      if (restoreSelectedValues) {
        this.matSelect._onChange(values);
      }
    });
  }
  /**
   *  Set the width of the innerSelectSearch to fit even custom scrollbars
   *  And support all Operating Systems
   */
  updateInputWidth() {
    if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
      return;
    }
    let element = this.innerSelectSearch.nativeElement;
    let panelElement = null;
    while (element && element.parentElement) {
      element = element.parentElement;
      if (element.classList.contains('mat-select-panel')) {
        panelElement = element;
        break;
      }
    }
    if (panelElement) {
      this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + 'px';
    }
  }
  /**
   * Determine the offset to length that can be caused by the optional matOption used as a search input.
   */
  getOptionsLengthOffset() {
    if (this.matOption) {
      return 1;
    } else {
      return 0;
    }
  }
  unselectActiveDescendant() {
    this.activeDescendant?.removeAttribute('aria-selected');
    this.searchSelectInput.nativeElement.removeAttribute('aria-activedescendant');
  }
  static ɵfac = function MatSelectSearchComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSelectSearchComponent)(
      ɵɵdirectiveInject(MatSelect),
      ɵɵdirectiveInject(ChangeDetectorRef),
      ɵɵdirectiveInject(ViewportRuler),
      ɵɵdirectiveInject(MatOption, 8),
      ɵɵdirectiveInject(MatFormField, 8),
      ɵɵdirectiveInject(MAT_SELECTSEARCH_DEFAULT_OPTIONS, 8),
    );
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatSelectSearchComponent,
    selectors: [['ngx-mat-select-search']],
    contentQueries: function MatSelectSearchComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MatSelectSearchClearDirective, 5);
        ɵɵcontentQuery(dirIndex, MatSelectNoEntriesFoundDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh((_t = ɵɵloadQuery())) && (ctx.clearIcon = _t.first);
        ɵɵqueryRefresh((_t = ɵɵloadQuery())) && (ctx.noEntriesFound = _t.first);
      }
    },
    viewQuery: function MatSelectSearchComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 7, ElementRef);
        ɵɵviewQuery(_c1, 7, ElementRef);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh((_t = ɵɵloadQuery())) && (ctx.searchSelectInput = _t.first);
        ɵɵqueryRefresh((_t = ɵɵloadQuery())) && (ctx.innerSelectSearch = _t.first);
      }
    },
    inputs: {
      placeholderLabel: 'placeholderLabel',
      type: 'type',
      closeIcon: 'closeIcon',
      closeSvgIcon: 'closeSvgIcon',
      noEntriesFoundLabel: 'noEntriesFoundLabel',
      clearSearchInput: 'clearSearchInput',
      searching: 'searching',
      disableInitialFocus: 'disableInitialFocus',
      enableClearOnEscapePressed: 'enableClearOnEscapePressed',
      preventHomeEndKeyPropagation: 'preventHomeEndKeyPropagation',
      disableScrollToActiveOnOptionsChanged: 'disableScrollToActiveOnOptionsChanged',
      ariaLabel: 'ariaLabel',
      showToggleAllCheckbox: 'showToggleAllCheckbox',
      toggleAllCheckboxChecked: 'toggleAllCheckboxChecked',
      toggleAllCheckboxIndeterminate: 'toggleAllCheckboxIndeterminate',
      toggleAllCheckboxTooltipMessage: 'toggleAllCheckboxTooltipMessage',
      toggleAllCheckboxTooltipPosition: 'toggleAllCheckboxTooltipPosition',
      hideClearSearchButton: 'hideClearSearchButton',
      alwaysRestoreSelectedOptionsMulti: 'alwaysRestoreSelectedOptionsMulti',
      recreateValuesArray: 'recreateValuesArray',
    },
    outputs: {
      toggleAll: 'toggleAll',
    },
    features: [
      ɵɵProvidersFeature([
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => _MatSelectSearchComponent),
          multi: true,
        },
      ]),
    ],
    ngContentSelectors: _c3,
    decls: 13,
    vars: 14,
    consts: [
      ['innerSelectSearch', ''],
      ['searchSelectInput', ''],
      ['matInput', '', 1, 'mat-select-search-input', 'mat-select-search-hidden'],
      [1, 'mat-select-search-inner', 'mat-typography', 'mat-datepicker-content', 'mat-tab-header'],
      [1, 'mat-select-search-inner-row'],
      [
        'matTooltipClass',
        'ngx-mat-select-search-toggle-all-tooltip',
        1,
        'mat-select-search-toggle-all-checkbox',
        3,
        'color',
        'checked',
        'indeterminate',
        'matTooltip',
        'matTooltipPosition',
      ],
      [
        'autocomplete',
        'off',
        1,
        'mat-select-search-input',
        3,
        'keydown',
        'keyup',
        'blur',
        'type',
        'formControl',
        'placeholder',
      ],
      ['diameter', '16', 1, 'mat-select-search-spinner'],
      ['mat-icon-button', '', 'aria-label', 'Clear', 1, 'mat-select-search-clear'],
      [1, 'mat-select-search-no-entries-found'],
      [
        'matTooltipClass',
        'ngx-mat-select-search-toggle-all-tooltip',
        1,
        'mat-select-search-toggle-all-checkbox',
        3,
        'change',
        'color',
        'checked',
        'indeterminate',
        'matTooltip',
        'matTooltipPosition',
      ],
      ['mat-icon-button', '', 'aria-label', 'Clear', 1, 'mat-select-search-clear', 3, 'click'],
      [3, 'svgIcon'],
    ],
    template: function MatSelectSearchComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵprojectionDef(_c2);
        ɵɵelement(0, 'input', 2);
        ɵɵelementStart(1, 'div', 3, 0)(3, 'div', 4);
        ɵɵtemplate(4, MatSelectSearchComponent_Conditional_4_Template, 1, 5, 'mat-checkbox', 5);
        ɵɵelementStart(5, 'input', 6, 1);
        ɵɵlistener('keydown', function MatSelectSearchComponent_Template_input_keydown_5_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx._handleKeydown($event));
        })('keyup', function MatSelectSearchComponent_Template_input_keyup_5_listener($event) {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx._handleKeyup($event));
        })('blur', function MatSelectSearchComponent_Template_input_blur_5_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.onBlur());
        });
        ɵɵelementEnd();
        ɵɵtemplate(7, MatSelectSearchComponent_Conditional_7_Template, 1, 0, 'mat-spinner', 7)(
          8,
          MatSelectSearchComponent_Conditional_8_Template,
          4,
          1,
          'button',
          8,
        );
        ɵɵprojection(9);
        ɵɵelementEnd();
        ɵɵelement(10, 'mat-divider');
        ɵɵelementEnd();
        ɵɵtemplate(11, MatSelectSearchComponent_Conditional_11_Template, 3, 1, 'div', 9);
        ɵɵpipe(12, 'async');
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵclassProp('mat-select-search-inner-multiple', ctx.matSelect.multiple)(
          'mat-select-search-inner-toggle-all',
          ctx._isToggleAllCheckboxVisible(),
        );
        ɵɵadvance(3);
        ɵɵconditional(ctx._isToggleAllCheckboxVisible() ? 4 : -1);
        ɵɵadvance();
        ɵɵproperty('type', ctx.type)('formControl', ctx._formControl)('placeholder', ctx.placeholderLabel);
        ɵɵattribute('aria-label', ctx.ariaLabel);
        ɵɵadvance(2);
        ɵɵconditional(ctx.searching ? 7 : -1);
        ɵɵadvance();
        ɵɵconditional(!ctx.hideClearSearchButton && ctx.value && !ctx.searching ? 8 : -1);
        ɵɵadvance(3);
        ɵɵconditional(ɵɵpipeBind1(12, 12, ctx._showNoEntriesFound$) ? 11 : -1);
      }
    },
    dependencies: [
      AsyncPipe,
      ReactiveFormsModule,
      DefaultValueAccessor,
      NgControlStatus,
      FormControlDirective,
      MatCheckbox,
      MatDivider,
      MatTooltip,
      MatProgressSpinner,
      MatIcon,
      MatButtonModule,
      MatIconButton,
    ],
    styles: [
      '.mat-select-search-hidden[_ngcontent-%COMP%]{visibility:hidden}.mat-select-search-inner[_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none;background-color:var(--mat-sys-surface-container, var(--mat-select-panel-background-color, white))}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-inner-row[_ngcontent-%COMP%]{display:flex;align-items:center}.mat-select-search-input[_ngcontent-%COMP%]{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background-color:var(--mat-sys-surface-container, var(--mat-select-panel-background-color, white));padding:0 44px 0 16px;height:47px;line-height:47px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-right:16px;padding-left:44px}.mat-select-search-input[_ngcontent-%COMP%]::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-left:5px}.mat-select-search-no-entries-found[_ngcontent-%COMP%]{padding-top:8px}.mat-select-search-clear[_ngcontent-%COMP%]{position:absolute;right:4px;top:0}[dir=rtl][_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{right:auto;left:4px}.mat-select-search-spinner[_ngcontent-%COMP%]{position:absolute;right:16px;top:calc(50% - 8px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%]{right:auto;left:16px}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}  .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:5px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:0;padding-right:5px}',
    ],
    changeDetection: 0,
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      MatSelectSearchComponent,
      [
        {
          type: Component,
          args: [
            {
              selector: 'ngx-mat-select-search',
              providers: [
                {
                  provide: NG_VALUE_ACCESSOR,
                  useExisting: forwardRef(() => MatSelectSearchComponent),
                  multi: true,
                },
              ],
              imports: [
                AsyncPipe,
                ReactiveFormsModule,
                MatCheckbox,
                MatDivider,
                MatTooltip,
                MatProgressSpinner,
                MatIcon,
                MatButtonModule,
              ],
              changeDetection: ChangeDetectionStrategy.OnPush,
              template:
                '<!--\nCopyright (c) 2018 Bithost GmbH All Rights Reserved.\n\nUse of this source code is governed by an MIT-style license that can be\nfound in the LICENSE file at https://angular.io/license\n-->\n<!-- Placeholder to adjust vertical offset of the mat-option elements -->\n<input matInput class="mat-select-search-input mat-select-search-hidden"/>\n\n<!-- Note: the  mat-datepicker-content mat-tab-header are needed to inherit the material theme colors, see PR #22 -->\n<div\n      #innerSelectSearch\n      class="mat-select-search-inner mat-typography mat-datepicker-content mat-tab-header"\n      [class.mat-select-search-inner-multiple]="matSelect.multiple"\n      [class.mat-select-search-inner-toggle-all]="_isToggleAllCheckboxVisible()">\n\n  <div class="mat-select-search-inner-row">\n    @if(_isToggleAllCheckboxVisible())\n    {\n      <mat-checkbox [color]="matFormField?.color"\n                    class="mat-select-search-toggle-all-checkbox"\n                    [checked]="toggleAllCheckboxChecked"\n                    [indeterminate]="toggleAllCheckboxIndeterminate"\n                    [matTooltip]="toggleAllCheckboxTooltipMessage"\n                    matTooltipClass="ngx-mat-select-search-toggle-all-tooltip"\n                    [matTooltipPosition]="toggleAllCheckboxTooltipPosition"\n                    (change)="_emitSelectAllBooleanToParent($event.checked)" />\n    }\n\n    <input class="mat-select-search-input"\n           autocomplete="off"\n           [type]="type"\n           [formControl]="_formControl"\n           #searchSelectInput\n           (keydown)="_handleKeydown($event)"\n           (keyup)="_handleKeyup($event)"\n           (blur)="onBlur()"\n           [placeholder]="placeholderLabel"\n           [attr.aria-label]="ariaLabel"\n    />\n    @if(searching)\n    {\n      <mat-spinner class="mat-select-search-spinner"\n                   diameter="16" />\n    }\n\n    @if(!hideClearSearchButton && value && !searching)\n    {\n      <button mat-icon-button\n              aria-label="Clear"\n              (click)="_reset(true)"\n              class="mat-select-search-clear">\n        @if(clearIcon)\n        {\n          <ng-content select="[ngxMatSelectSearchClear]" />\n        }\n        @else if(closeSvgIcon)\n        {\n          <mat-icon [svgIcon]="closeSvgIcon" />\n        }\n        @else\n        {\n          <mat-icon>\n            {{closeIcon}}\n          </mat-icon>\n        }\n      </button>\n    }\n\n\n    <ng-content select=".mat-select-search-custom-header-content" />\n  </div>\n\n  <mat-divider />\n</div>\n\n@if(_showNoEntriesFound$ | async)\n{\n  <div class="mat-select-search-no-entries-found">\n    @if(noEntriesFound)\n    {\n      <ng-content select="[ngxMatSelectNoEntriesFound]" />\n    }\n    @else\n    {\n      {{noEntriesFoundLabel}}\n    }\n  </div>\n}\n\n',
              styles: [
                '.mat-select-search-hidden{visibility:hidden}.mat-select-search-inner{position:absolute;top:0;left:0;width:100%;z-index:100;font-size:inherit;box-shadow:none;background-color:var(--mat-sys-surface-container, var(--mat-select-panel-background-color, white))}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all .mat-select-search-inner-row{display:flex;align-items:center}.mat-select-search-input{box-sizing:border-box;width:100%;border:none;font-family:inherit;font-size:inherit;color:currentColor;outline:none;background-color:var(--mat-sys-surface-container, var(--mat-select-panel-background-color, white));padding:0 44px 0 16px;height:47px;line-height:47px}:host-context([dir=rtl]) .mat-select-search-input{padding-right:16px;padding-left:44px}.mat-select-search-input::placeholder{color:var(--mdc-filled-text-field-input-text-placeholder-color)}.mat-select-search-inner-toggle-all .mat-select-search-input{padding-left:5px}.mat-select-search-no-entries-found{padding-top:8px}.mat-select-search-clear{position:absolute;right:4px;top:0}:host-context([dir=rtl]) .mat-select-search-clear{right:auto;left:4px}.mat-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .mat-select-search-spinner{right:auto;left:16px}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search{position:sticky;top:-8px;z-index:1;opacity:1;margin-top:-8px;pointer-events:all}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search mat-pseudo-checkbox{display:none}::ng-deep .mat-mdc-option[aria-disabled=true].contains-mat-select-search .mdc-list-item__primary-text{opacity:1}.mat-select-search-toggle-all-checkbox{padding-left:5px}:host-context([dir=rtl]) .mat-select-search-toggle-all-checkbox{padding-left:0;padding-right:5px}\n',
              ],
            },
          ],
        },
      ],
      () => [
        {
          type: MatSelect,
          decorators: [
            {
              type: Inject,
              args: [MatSelect],
            },
          ],
        },
        {
          type: ChangeDetectorRef,
        },
        {
          type: ViewportRuler,
        },
        {
          type: MatOption,
          decorators: [
            {
              type: Optional,
            },
            {
              type: Inject,
              args: [MatOption],
            },
          ],
        },
        {
          type: MatFormField,
          decorators: [
            {
              type: Optional,
            },
            {
              type: Inject,
              args: [MatFormField],
            },
          ],
        },
        {
          type: void 0,
          decorators: [
            {
              type: Optional,
            },
            {
              type: Inject,
              args: [MAT_SELECTSEARCH_DEFAULT_OPTIONS],
            },
          ],
        },
      ],
      {
        placeholderLabel: [
          {
            type: Input,
          },
        ],
        type: [
          {
            type: Input,
          },
        ],
        closeIcon: [
          {
            type: Input,
          },
        ],
        closeSvgIcon: [
          {
            type: Input,
          },
        ],
        noEntriesFoundLabel: [
          {
            type: Input,
          },
        ],
        clearSearchInput: [
          {
            type: Input,
          },
        ],
        searching: [
          {
            type: Input,
          },
        ],
        disableInitialFocus: [
          {
            type: Input,
          },
        ],
        enableClearOnEscapePressed: [
          {
            type: Input,
          },
        ],
        preventHomeEndKeyPropagation: [
          {
            type: Input,
          },
        ],
        disableScrollToActiveOnOptionsChanged: [
          {
            type: Input,
          },
        ],
        ariaLabel: [
          {
            type: Input,
          },
        ],
        showToggleAllCheckbox: [
          {
            type: Input,
          },
        ],
        toggleAllCheckboxChecked: [
          {
            type: Input,
          },
        ],
        toggleAllCheckboxIndeterminate: [
          {
            type: Input,
          },
        ],
        toggleAllCheckboxTooltipMessage: [
          {
            type: Input,
          },
        ],
        toggleAllCheckboxTooltipPosition: [
          {
            type: Input,
          },
        ],
        hideClearSearchButton: [
          {
            type: Input,
          },
        ],
        alwaysRestoreSelectedOptionsMulti: [
          {
            type: Input,
          },
        ],
        recreateValuesArray: [
          {
            type: Input,
          },
        ],
        toggleAll: [
          {
            type: Output,
          },
        ],
        searchSelectInput: [
          {
            type: ViewChild,
            args: [
              'searchSelectInput',
              {
                read: ElementRef,
                static: true,
              },
            ],
          },
        ],
        innerSelectSearch: [
          {
            type: ViewChild,
            args: [
              'innerSelectSearch',
              {
                read: ElementRef,
                static: true,
              },
            ],
          },
        ],
        clearIcon: [
          {
            type: ContentChild,
            args: [MatSelectSearchClearDirective],
          },
        ],
        noEntriesFound: [
          {
            type: ContentChild,
            args: [MatSelectNoEntriesFoundDirective],
          },
        ],
      },
    );
})();
var MatSelectSearchVersion = '8.0.2';
var NgxMatSelectSearchModule = class _NgxMatSelectSearchModule {
  static ɵfac = function NgxMatSelectSearchModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgxMatSelectSearchModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NgxMatSelectSearchModule,
    imports: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective],
    exports: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective],
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [MatSelectSearchComponent],
  });
};
(() => {
  (typeof ngDevMode === 'undefined' || ngDevMode) &&
    setClassMetadata(
      NgxMatSelectSearchModule,
      [
        {
          type: NgModule,
          args: [
            {
              imports: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective],
              exports: [MatSelectSearchComponent, MatSelectSearchClearDirective, MatSelectNoEntriesFoundDirective],
            },
          ],
        },
      ],
      null,
      null,
    );
})();
export {
  MAT_SELECTSEARCH_DEFAULT_OPTIONS,
  MatSelectNoEntriesFoundDirective,
  MatSelectSearchClearDirective,
  MatSelectSearchComponent,
  MatSelectSearchVersion,
  NgxMatSelectSearchModule,
  configurableDefaultOptions,
};
//# sourceMappingURL=ngx-mat-select-search.js.map
