import { Request, Response } from 'express';
import Material, { IMaterials } from '../Models/Materials.model'; // Assurez-vous que le chemin du modèle est correct

// Créer un nouveau matériau
export const createMaterial = async (req: Request, res: Response) => {
  try {
    const newMaterial: IMaterials = new Material(req.body);
    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du matériau' });
  }
};

// Obtenir tous les matériaux
export const getMaterials = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    if (status === '200') {
      const materials = await Material.find();
      res.status(200).json(materials);
    } else {
      res.status(400).json({ error: 'Requête incorrecte' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des matériaux' });
  }
};

// Obtenir un matériau par son ID
export const getMaterialById = async (req: Request, res: Response) => {
  const { materialId } = req.params;
  try {
    const material = await Material.findById(materialId);
    if (!material) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération du matériau' });
  }
};

// Mettre à jour un matériau par son ID
export const updateMaterial = async (req: Request, res: Response) => {
  const { materialId } = req.params;
  try {
    const updatedMaterial = await Material.findByIdAndUpdate(materialId, req.body, { new: true });
    if (!updatedMaterial) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.status(200).json(updatedMaterial);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour du matériau' });
  }
};

// Supprimer un matériau par son ID
export const deleteMaterial = async (req: Request, res: Response) => {
  const { materialId } = req.params;
  try {
    const deletedMaterial = await Material.findByIdAndRemove(materialId);
    if (!deletedMaterial) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du matériau' });
  }
};
