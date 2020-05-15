import Tree from './Tree'

export const camelCaseToNormal = (str) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (str2) => str2.toUpperCase())

const RecursiveProperty = ({
  property,
  propertyName,
  propertyNameProcessor,
  emptyPropertyLabel,
}) => {
  return (
    <>
      {property ? (
        typeof property === 'number' ||
        typeof property === 'string' ||
        typeof property === 'boolean' ? (
          <>
            <Tree
              name={`${propertyNameProcessor(
                propertyName,
              )} : ${property.toString()}`}
            />
          </>
        ) : (
          <Tree name={propertyNameProcessor(propertyName)}>
            {Object.values(property).map(
              (recursiveProperty, index, { length }) => (
                <RecursiveProperty
                  key={index}
                  property={recursiveProperty}
                  propertyName={Object.getOwnPropertyNames(property)[index]}
                  propertyNameProcessor={propertyNameProcessor}
                  excludeBottomBorder={index === length - 1}
                />
              ),
            )}
          </Tree>
        )
      ) : (
        emptyPropertyLabel
      )}
    </>
  )
}

RecursiveProperty.defaultProps = {
  emptyPropertyLabel: 'Property is empty',
  excludeBottomBorder: false,
  propertyNameProcessor: camelCaseToNormal,
}

// export default RecursiveProperty

export default ({ attributes, children, data, selectedCompany = 'Main' }) => {
  return (
    <div {...attributes}>
      {children}
      <RecursiveProperty
        property={data}
        propertyName={selectedCompany}
        excludeBottomBorder={false}
        rootProperty
      />
    </div>
  )
}
