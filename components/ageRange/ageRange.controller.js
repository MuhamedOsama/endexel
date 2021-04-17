const { activateAgeRange, createAgeRange, deactivateAgeRange, deleteAgeRange, getAgeRange, getAllageRanges, getAvailableageRanges, updateAgeRange } = require("./ageRange.service");
const catchAsync = require("./../../utils/catchAsync");

module.exports = {
    createAgeRange: catchAsync(async (req, res, next) => {
        const newAgeRange = await createAgeRange(req.body);
        res.status(200).json({
            status: "success",
            data: newAgeRange,
        });
    }),

    getAgeRange: catchAsync(async (req, res, next) => {
        const ageRange = await getAgeRange(req.params.id);
        res.status(200).json({
            status: "success",
            data: ageRange
        });
    }),

    getAllAgeRanges: catchAsync(async (req, res, next) => {
        const ageRanges = await getAllAgeRanges();
        res.status(200).json({
            status: "success",
            data: ageRanges,
        });
    }),
    updateAgeRange: catchAsync(async (req, res, next) => {
        const ageRange = await updateAgeRange(
            req.params.id,
            req.body
        );
        res.status(200).json({
            status: "success",
            data: ageRange
        });
    }),

    deleteAgeRange: catchAsync(async (req, res, nex) => {
        await deleteAgeRange(req.params.id);
        res.status(200).json({
            status: "success",
            data: null,
        });
    }),
    ageRangesLookup: catchAsync(async (req, res, next) => {
        const ageRanges = await getAvailableageRanges()
        res.status(200).json({
            status: "success",
            data: ageRanges
        })
    }),
    deactivateAgeRange: catchAsync(async (req, res, next) => {
        const ageRange = await deactivateAgeRange(req.params.id)
        res.status(200).json({
            status: "success",
            data: ageRange
        })
    }),
    activateAgeRange: catchAsync(async (req, res, next) => {
        const ageRange = await activateAgeRange(req.params.id)
        res.status(200).json({
            status: "success",
            data: ageRange
        })
    })

};
