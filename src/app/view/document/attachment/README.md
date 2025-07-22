# DocumentAttachmentComponent

A reusable Angular component for managing document attachments for any entity in the application.

## Features

- Upload documents with type selection
- Display documents grouped by type
- Download documents
- Delete documents
- Collapsible interface
- Configurable permissions (upload, download, delete)
- Support for any entity type

## Usage

### Basic Usage

```html
<app-document-attachment
  [entityType]="EntityType.PROCESS"
  [entityId]="processId"
  title="document.title">
</app-document-attachment>
```

### Advanced Usage with Configuration

```html
<app-document-attachment
  [entityType]="EntityType.REGULATOR"
  [entityId]="regulatorId"
  title="regulator.documents"
  [allowUpload]="true"
  [allowDownload]="true"
  [allowDelete]="false"
  [collapsible]="true">
</app-document-attachment>
```

## Input Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `entityType` | `EntityType` | **Required** | The type of entity (PROCESS, REGULATOR, etc.) |
| `entityId` | `string \| number` | **Required** | The ID of the entity |
| `title` | `string` | `'document.title'` | Translation key for the section title |
| `allowUpload` | `boolean` | `true` | Whether to show upload functionality |
| `allowDownload` | `boolean` | `true` | Whether to show download buttons |
| `allowDelete` | `boolean` | `true` | Whether to show delete buttons |
| `collapsible` | `boolean` | `true` | Whether the section can be collapsed |

## Examples

### For Process Documents
```typescript
// In component
readonly processId = signal<number>(123);
readonly EntityType = EntityType;
```

```html
<app-document-attachment
  [entityType]="EntityType.PROCESS"
  [entityId]="processId()"
  title="process.documents">
</app-document-attachment>
```

### For Regulator Documents (Read-only)
```html
<app-document-attachment
  [entityType]="EntityType.REGULATOR"
  [entityId]="regulatorId"
  title="regulator.documents"
  [allowUpload]="false"
  [allowDelete]="false">
</app-document-attachment>
```

### For Document Types Management
```html
<app-document-attachment
  [entityType]="EntityType.DOCUMENT_TYPE"
  [entityId]="documentTypeId"
  title="document.attachments"
  [collapsible]="false">
</app-document-attachment>
```

## Dependencies

The component depends on the following services and stores:
- `DocumentApiStore` - For managing document state
- `DocumentTypeApiStore` - For managing document types
- `DocumentApi` - For API operations
- Material Design components
- NgxTranslate for internationalization

## Implementation Details

The component automatically:
- Loads documents for the specified entity on initialization
- Loads available document types
- Groups documents by type for better organization
- Handles upload, download, and delete operations
- Shows appropriate loading states and error messages
- Resets the store to prevent data conflicts

## Migration from Inline Document Code

To replace inline document management code:

1. Remove document-related imports from your component
2. Remove document store injections
3. Remove document-related methods and properties
4. Replace the document HTML section with `<app-document-attachment>`
5. Import `DocumentAttachmentComponent` in your component imports

### Before (Inline Implementation)
```typescript
// Multiple imports and injections
private documentApiStore = inject(DocumentApiStore);
private documentTypeApiStore = inject(DocumentTypeApiStore);
// ... document methods ...
```

### After (Using DocumentAttachmentComponent)
```typescript
import { DocumentAttachmentComponent } from '@app/view/document';

@Component({
  imports: [
    // ... other imports
    DocumentAttachmentComponent,
  ],
  // ...
})
export class MyComponent {
  // Clean component with just entity-specific logic
}
```
