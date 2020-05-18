import Tree, { TreePlainText } from './Tree'

export const camelCaseToNormal = (str) =>
  str.replace(/([A-Z])/g, ' $1').replace(/^./, (str2) => str2.toUpperCase())

const RecursiveProperty = ({
  property,
  propertyName,
  propertyNameProcessor,
}) => {
  return (
    <>
      {property ? (
        typeof property === 'number' ||
        typeof property === 'string' ||
        typeof property === 'boolean' ? (
          <>
            <TreePlainText
              name={`${propertyNameProcessor(propertyName)}`}
              contentStyle={{
                opacity: 0.7,
                // margin: '8px 0 4px',
                // height: 'fit-content',
                lineHeight: '100%',
              }}
              iconStyle={{ display: 'none' }}
              text={property.toString()}
            ></TreePlainText>
          </>
        ) : (
          <TreePlainText name={propertyNameProcessor(propertyName)} defaultOpen>
            {Object.values(property).map(
              (recursiveProperty, index, { length }) => (
                <RecursiveProperty
                  key={index}
                  property={recursiveProperty}
                  propertyName={Object.getOwnPropertyNames(property)[index]}
                  propertyNameProcessor={propertyNameProcessor}
                />
              ),
            )}
          </TreePlainText>
        )
      ) : (
        <div />
      )}
    </>
  )
  // return (
  //   <>
  //     {property ? (
  //       typeof property === 'number' ||
  //       typeof property === 'string' ||
  //       typeof property === 'boolean' ? (
  //         <>
  //           <Tree
  //             name={`${propertyNameProcessor(propertyName)}`}
  //             contentStyle={{
  //               opacity: 0.7,
  //               margin: '8px 0 4px',
  //               height: 'fit-content',
  //               lineHeight: '100%',
  //             }}
  //             iconStyle={{ display: 'none' }}
  //           >
  //             {property.toString()}
  //           </Tree>
  //         </>
  //       ) : (
  //         <Tree
  //           name={propertyNameProcessor(propertyName)}
  //           defaultOpen={propertyName === 'Insight'}
  //         >
  //           {Object.values(property).map(
  //             (recursiveProperty, index, { length }) => (
  //               <RecursiveProperty
  //                 key={index}
  //                 property={recursiveProperty}
  //                 propertyName={Object.getOwnPropertyNames(property)[index]}
  //                 propertyNameProcessor={propertyNameProcessor}
  //               />
  //             ),
  //           )}
  //         </Tree>
  //       )
  //     ) : (
  //       <div />
  //     )}
  //   </>
  // )
}

RecursiveProperty.defaultProps = {
  emptyPropertyLabel: 'Property is empty',
  propertyNameProcessor: camelCaseToNormal,
}

// export default RecursiveProperty

export default ({
  attributes,
  children,
  data,
  selectedCompany = 'Insight',
}) => {
  return (
    <div {...attributes}>
      {children}
      <RecursiveProperty
        property={data}
        propertyName={selectedCompany}
        rootProperty
      />
    </div>
  )
}
