const { activateTargetAudience, createTargetAudience, deactivateTargetAudience, deleteTargetAudience, getTargetAudience, getAllTargetAudiences, getAvailableTargetAudiences, updateTargetAudience } = require("./targetAudience.service");
const catchAsync = require("./../../utils/catchAsync");

module.exports = {
    createTargetAudience: catchAsync(async (req, res, next) => {
        const newTargetAudience = await createTargetAudience(req.body);
        res.status(200).json({
            status: "success",
            data: newTargetAudience,
        });
    }),

    getTargetAudience: catchAsync(async (req, res, next) => {
        const targetAudience = await getTargetAudience(req.params.id);
        res.status(200).json({
            status: "success",
            data: targetAudience
        });
    }),

    getAllTargetAudiences: catchAsync(async (req, res, next) => {
        const targetAudiences = await getAllTargetAudiences();
        res.status(200).json({
            status: "success",
            data: targetAudiences,
        });
    }),
    updateTargetAudience: catchAsync(async (req, res, next) => {
        const targetAudience = await updateTargetAudience(
            req.params.id,
            req.body
        );
        res.status(200).json({
            status: "success",
            data: targetAudience
        });
    }),

    deleteTargetAudience: catchAsync(async (req, res, nex) => {
        await deleteTargetAudience(req.params.id);
        res.status(200).json({
            status: "success",
            data: null,
        });
    }),
    targetAudiencesLookup: catchAsync(async (req, res, next) => {
        const targetAudiences = await getAvailableTargetAudiences()
        res.status(200).json({
            status: "success",
            data: targetAudiences
        })
    }),
    deactivateTargetAudience: catchAsync(async (req, res, next) => {
        const targetAudience = await deactivateTargetAudience(req.params.id)
        res.status(200).json({
            status: "success",
            data: targetAudience
        })
    }),
    activateTargetAudience: catchAsync(async (req, res, next) => {
        const targetAudience = await activateTargetAudience(req.params.id)
        res.status(200).json({
            status: "success",
            data: targetAudience
        })
    })

};
