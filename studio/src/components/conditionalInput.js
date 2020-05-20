/* eslint-disable react/require-default-props */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types'
import React from 'react'
import Fieldset from 'part:@sanity/components/fieldsets/default'
import { setIfMissing } from 'part:@sanity/form-builder/patch-event'

// FormBuilderInput automatically generates fields from a schema
// a Higher Order Component that passes document values as props
import { FormBuilderInput, withDocument } from 'part:@sanity/form-builder'

class ConditionalInput extends React.PureComponent {
  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    level: PropTypes.number,
    value: PropTypes.shape({
      _type: PropTypes.string,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    focusPath: PropTypes.array.isRequired,
    onFocus: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

  firstFieldInput = React.createRef()

  handleFieldChange = (field, fieldPatchEvent) => {
    const { onChange, type } = this.props
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(
      fieldPatchEvent
        .prefixAll(field.name)
        .prepend(setIfMissing({ _type: type.name })),
    )
  }

  focus() {
    this.firstFieldInput.current.focus()
  }

  render() {
    console.log(this.props)
    const {
      document,
      type,
      value,
      level,
      focusPath,
      onFocus,
      onBlur,
    } = this.props

    const { template = '' } = document
    const { fields, templates } = type
    const matchesTemplate = templates.includes(template)
    const hasFields = fields && fields.length >= 1
    const hide = !matchesTemplate || !hasFields

    // if (!matchesTemplate || !hasFields) {
    //   return null
    // }

    return (
      <Fieldset
        style={{ display: hide ? 'none' : 'block' }}
        level={level}
        legend={type.title}
        description={type.description}
        isCollapsible={!!type.options && !!type.options.collapsible}
        isCollapsed={!!type.options && !!type.options.collapsed}
      >
        <div>
          {fields.map((field, i) => (
            // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
            // for the given field type
            <FormBuilderInput
              level={level + 1}
              ref={i === 0 ? this.firstFieldInput : null}
              key={field.name}
              type={field.type}
              value={value && value[field.name]}
              onChange={(patchEvent) => {
                this.handleFieldChange(field, patchEvent)
              }}
              path={[field.name]}
              focusPath={focusPath}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          ))}
        </div>
      </Fieldset>
    )
  }
}

export default withDocument(ConditionalInput)
