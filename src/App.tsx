import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

export default function WordComposer() {
  const [numbers, setNumbers] = useState([]);
  const [syllables, setSyllables] = useState([]);
  const [composition, setComposition] = useState([]);

  useEffect(() => {
    // Configure numbers
    const nums = "0123456789".split("").map((num, index) => ({
      id: `number-${index}`,
      value: num,
      type: "number",
    }));
    setNumbers(nums);

    // Configure syllables
    const syllableList = [
      "A",
      "E",
      "I",
      "O",
      "U",
      "BA",
      "BE",
      "BI",
      "BO",
      "BU",
      "ZA",
      "ZE",
      "ZI",
      "ZO",
      "ZU",
      "TA",
      "TE",
      "TI",
      "TO",
      "TU",
      "LA",
      "LE",
      "LI",
      "LO",
      "LU",
      "NA",
      "NE",
      "NI",
      "NO",
      "NU",
      "SA",
      "SE",
      "SI",
      "SO",
      "SU",
      "JA",
      "JE",
      "JI",
      "JO",
      "JU",
      "VA",
      "VE",
      "VI",
      "VO",
      "VU",
      "RA",
      "RE",
      "RI",
      "RO",
      "RU",
      "FA",
      "FE",
      "FI",
      "FO",
      "FU",
      "GA",
      "GE",
      "GI",
      "GO",
      "GU",
      "PA",
      "PE",
      "PI",
      "PO",
      "PU",
      "QUA",
      "QUE",
      "QUI",
      "QUO",
      "KA",
      "KE",
      "KI",
      "KO",
      "KU",
      "DA",
      "DE",
      "DI",
      "DO",
      "DU",
      "XA",
      "XE",
      "XI",
      "XO",
      "XU",
      "HA",
      "HE",
      "HI",
      "HO",
      "HU",
      "CA",
      "CE",
      "CI",
      "CO",
      "CU",
      "MA",
      "ME",
      "MI",
      "MO",
      "MU",
      "CHA",
      "CHE",
      "CHI",
      "CHO",
      "CHU",
    ].map((syllable, index) => ({
      id: `syllable-${index}`,
      value: syllable,
      type: "syllable",
    }));
    setSyllables(syllableList);
  }, []);

  const addItemToComposition = (item) => {
    const lastItem = composition[composition.length - 1];

    if (lastItem?.type === "number" && item.type === "number") {
      setComposition([
        ...composition.slice(0, -1),
        {
          ...lastItem,
          value: lastItem.value + item.value,
          id: `comp-${Date.now()}`,
        },
      ]);
    } else if (lastItem?.type === "syllable" && item.type === "syllable") {
      setComposition([
        ...composition.slice(0, -1),
        {
          ...lastItem,
          value: lastItem.value + item.value,
          id: `comp-${Date.now()}`,
        },
      ]);
    } else {
      setComposition([
        ...composition,
        {
          ...item,
          id: `comp-${Date.now()}`,
        },
      ]);
    }
  };

  const addSpace = () => {
    setComposition([
      ...composition,
      {
        id: `space-${Date.now()}`,
        value: " ",
        type: "space",
      },
    ]);
  };

  const clearAll = () => {
    setComposition([]);
  };

  const removeLastItem = () => {
    if (composition.length === 0) return;

    const lastItem = composition[composition.length - 1];
    if (lastItem.value.length > 1) {
      // Se o último item contém mais de um caractere, remove o último caractere
      const updatedItem = {
        ...lastItem,
        value: lastItem.value.slice(0, -1), // Remove o último caractere
      };
      setComposition([...composition.slice(0, -1), updatedItem]);
    } else {
      // Se o último item contém apenas um caractere, remove o item inteiro
      setComposition(composition.slice(0, -1));
    }
  };

  const removeLetter = (id) => {
    setComposition(composition.filter((item) => item.id !== id));
  };

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mt: 5 }}>
      <CardHeader
        title="Compositor de Palavras"
        titleTypographyProps={{
          variant: "h5",
          align: "center",
          fontWeight: "bold",
        }}
      />
      <CardContent>
        {/* Composition area */}
        <Box
          sx={{
            minHeight: 100,
            p: 2,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "start",
            bgcolor: "grey.100",
            borderRadius: 1,
            border: 1,
            borderColor: "grey.300",
          }}
        >
          {composition.length === 0 ? (
            <Typography color="textSecondary" sx={{ mx: 4, my: 6 }}>
              Clique nas sílabas para adicionar
            </Typography>
          ) : (
            composition.map((item) => (
              <Box
                key={item.id}
                sx={{
                  px: item.type === "space" ? 0 : 1,
                  py: item.type === "space" ? 0 : 0.5,
                  m: 0.5,
                  bgcolor: item.type === "space" ? "grey.200" : "white",
                  boxShadow: 1,
                  borderRadius: 1,
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "h6.fontSize",
                }}
                onClick={() => removeLetter(item.id)}
              >
                {item.type !== "space" && item.value}
              </Box>
            ))
          )}
        </Box>

        {/* Controls */}
        <Box sx={{ display: "flex", gap: 2, my: 4, justifyContent: "center" }}>
          <Button
            onClick={addSpace}
            variant="outlined"
            startIcon={<span>␣</span>} // Substitui ícone de espaço
          >
            Espaço
          </Button>
          <Button
            onClick={removeLastItem}
            variant="contained"
            color="warning"
            startIcon={<span>⬅️</span>} // Ícone de seta para remoção do último item
          >
            Remover Último
          </Button>
          <Button
            onClick={clearAll}
            variant="contained"
            color="error"
            startIcon={<span>🗑️</span>} // Substitui ícone de lixeira
          >
            Limpar
          </Button>
        </Box>

        {/* Syllables */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" align="center" gutterBottom>
            Sílabas:
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {syllables.map((syllable) => (
              <Grid item key={syllable.id}>
                <Button
                  onClick={() => addItemToComposition(syllable)}
                  variant="outlined"
                  sx={{ minWidth: 48, fontWeight: "bold" }}
                >
                  {syllable.value}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Numbers */}
        <Box>
          <Typography variant="h6" align="center" gutterBottom>
            Números:
          </Typography>
          <Grid container spacing={1} justifyContent="center">
            {numbers.map((number) => (
              <Grid item key={number.id}>
                <Button
                  onClick={() => addItemToComposition(number)}
                  variant="outlined"
                  sx={{ minWidth: 48, fontWeight: "bold" }}
                >
                  {number.value}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
