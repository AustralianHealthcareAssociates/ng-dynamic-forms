import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    DynamicFormComponent,
    DynamicFormComponentService,
    DynamicFormControlEvent,
    DynamicFormLayout,
    DynamicFormModel,
    DynamicTemplateDirective,
} from '../../../ng-dynamic-forms';
import { DynamicBootstrapFormControlContainerComponent } from './dynamic-bootstrap-form-control-container.component';

@Component({
    selector: 'dynamic-bootstrap-form',
    templateUrl: './dynamic-bootstrap-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicBootstrapFormComponent extends DynamicFormComponent {
    @Input() group: FormGroup;
    @Input() model: DynamicFormModel;
    @Input() layout: DynamicFormLayout;

    @Output()
    blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output()
    change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output()
    focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @Output()
    bsEvent: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;
    @Input() templatesInput?: QueryList<DynamicTemplateDirective>;
    @ViewChildren(DynamicBootstrapFormControlContainerComponent)
    components: QueryList<DynamicBootstrapFormControlContainerComponent>;

    constructor(
        protected changeDetectorRef: ChangeDetectorRef,
        protected componentService: DynamicFormComponentService
    ) {
        super(changeDetectorRef, componentService);
    }

    ngAfterContentInit() {
        // how do we feel about using CDR
        let newtemp;
        if (this.templates != null && this.templatesInput != null) {
            newtemp = [...this.templates.toArray(), ...this.templatesInput.toArray()];
        } else if (this.templates != null && this.templatesInput == null) {
            newtemp = [...this.templates.toArray()];
        } else if (this.templates == null && this.templatesInput != null) {
            newtemp = [...this.templatesInput.toArray()];
        }
        this.templates = newtemp;
        this.changeDetectorRef.detectChanges();

    }
}
