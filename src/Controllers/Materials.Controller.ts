import { Request, Response } from 'express';
import Material, { IMaterials } from '../Models/Materials.model';
import mongoose from 'mongoose';

export const createMaterial = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ error: 'Les données sont incomplètes' });
    }

    const newMaterial: IMaterials = new Material({ name, description });
    const savedMaterial = await newMaterial.save();
    res.status(201).json({ material: savedMaterial });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du matériau' });
  }
};


// Obtenir tous les matériaux
export const getMaterials = async (req: Request, res: Response) => {
  try {
    
    const materials = await Material.find();
    res.status(200).json(materials);
    
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
    if (!mongoose.Types.ObjectId.isValid(materialId)) {
      return res.status(400).json({ error: 'ID invalide' });
    }
    const deletedMaterial = await Material.findByIdAndRemove(materialId);
    if (!deletedMaterial) {
      return res.status(404).json({ error: 'Matériau non trouvé' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression du matériau' });
  }
};
