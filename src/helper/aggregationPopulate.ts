interface ILookupObject {
  from: string;
  foreignField: string;
  localField: string;
  as: string;
}

export const aggregationPopulate = (objectArray: ILookupObject[]) => {
  const aggregationObj = objectArray.map((obj) => {
    return [
      { $lookup: { ...obj } },
      { $addFields: { [obj.localField]: { $arrayElemAt: [`$${obj.localField}`, 0] } } },
    ];
  });

  return aggregationObj.flat(1);
};
