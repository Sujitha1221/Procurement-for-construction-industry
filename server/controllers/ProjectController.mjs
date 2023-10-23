import Project from '../models/Project.mjs';

export const addProject = async (req, res) => {
    const { empId, projectName } = req.body;

    try {
        const project = await Project.create({
            empId,
            projectName
        });
        console.log({ status: 'Success', project });
        res.json(project);
    } catch (err) {
        console.log({ status: 'Error', err });
    }
}

export const getProjectByEmpId = async (req, res) => {
    const { empId } = req.params;

    try {
        const projects = await Project.find({ empId: empId });
        if (!projects || projects.length === 0) {
            return res.json({ status: "No Projects found" });
        } else {
            return res.json(projects);
        }
    } catch (err) {
        console.log({ status: "Error", err });
        return res.json({ status: "Error", err });
    }
};