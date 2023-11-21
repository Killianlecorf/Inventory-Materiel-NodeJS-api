import { Request, Response } from 'express';
import LendMaterial from '../../src/Models/LendMaterials';
import Material from '../../src/Models/Materials.model';

// Controller pour créer un nouvel élément LendMaterials
export const createLendMaterial = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const date = new Date();
    const { materialId } = req.params;
    if (!isValidMaterialId(materialId)) {
      return res.status(404).json({ error: 'ID de matériel non valide' });
    }

    const material = await Material.findById(materialId);

    if (!material) {
      return res.status(404).json({ error: 'Matériel non trouvé' });
    }

    const lendMaterial = new LendMaterial({
      email,
      date,
      material: materialId,
    });

    const savedLendMaterial = await lendMaterial.save();
    res.status(201).json(savedLendMaterial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Impossible de créer le prêt de matériel' });
  }
};

function isValidMaterialId(id: string) {
  return id.length === 24;
}

export const getLendMaterialsByMaterialId = async (req: Request, res: Response) => {
  try {
    const materialId = req.params.materialId;

    // Vérifie si l'ID du matériel est valide
    if (!isValidMaterialId(materialId)) {
      return res.status(404).json({ error: 'ID de matériel non valide' });
    }

    // Recherche les prêts de matériel pour l'ID de matériel donné
    const lendMaterials = await LendMaterial.find({ material: materialId });

    if (lendMaterials.length === 0) {
      return res.status(404).json({ error: 'Aucun prêt de matériel trouvé pour cet ID de matériel.' });
    }
    res.status(200).json(lendMaterials);
  } catch (error) {
    res.status(500).json({ error: 'Impossible de récupérer les prêts de matériel.' });
  }
};


// Controller pour récupérer tous les éléments LendMaterials
export const getAllLendMaterials = async (req: Request, res: Response) => {
  try {
    const lendMaterials = await LendMaterial.find();
    res.status(200).json(lendMaterials);
  } catch (error) {
    res.status(500).json({ error: 'Impossible de récupérer les prêts de matériel' });
  }
};

export const getLendMaterialById = async (req: Request, res: Response) => {
  try {
    const lendMaterialId = req.params.id;

    // Vérifie si l'ID du matériel est valide
    if (!isValidMaterialId(lendMaterialId)) {
      return res.status(404).json({ error: 'ID de matériel non valide' });
    }

    const lendMaterial = await LendMaterial.findById(lendMaterialId);

    if (!lendMaterial) {
      return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
    }

    res.status(200).json(lendMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Impossible de récupérer le prêt de matériel' });
  }
};


// Controller pour mettre à jour un élément LendMaterials par ID
export const updateLendMaterial = async (req: Request, res: Response) => {
  try {
    const lendMaterial = await LendMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!isValidMaterialId(lendMaterial?._id)) {
      return res.status(404).json({ error: 'ID de matériel non valide' });
    }

    if (!lendMaterial) {
      return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
    }
    res.status(200).json(lendMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Impossible de mettre à jour le prêt de matériel' });
  }
};

// Controller pour supprimer un élément LendMaterials par ID
export const deleteLendMaterial = async (req: Request, res: Response) => {
  try {
    if (!isValidMaterialId(req.params.id)) {
      return res.status(404).json({ error: 'ID de matériel non valide' });
    }

    const lendMaterial = await LendMaterial.findByIdAndRemove(req.params.id);

    if (!lendMaterial) {
      return res.status(404).json({ error: 'Prêt de matériel non trouvé' });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Impossible de supprimer le prêt de matériel' });
  }
};
