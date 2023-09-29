import { Paper, Skeleton, Card, Grid, CardContent, Box } from "@mui/material"

export default function TimeLineLoading() {
  return (
    <Box sx={{ p: 3 }}>
      {[3, 3, 3].map((el, ind) => {
        return (
          <Paper
            key={ind}
            sx={{
              py: 2,
              px: 2,
              borderRadius: 2,
              mb: 2
            }}
          >
            <Skeleton variant="text" sx={{ fontSize: 34, width: 200, mb: 2 }} />
            <Grid container spacing={1}>
              {Array.from({ length: el }, (_, index) => (
                <Grid key={index} item lg={4} md={6} sm={6} xs={12}>
                  <Card
                    sx={{
                      boxShadow: "none",
                      border: "rgba(0,0,0,0.15) solid 1px"
                    }}
                  >
                    <Skeleton variant="rectangular" height={180} />
                    <CardContent sx={{ p: 1, pb: 0 }}>
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: 24, width: 160 }}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: 20, width: 90 }}
                      />
                      <Skeleton
                        variant="rectangular"
                        sx={{ height: 40, borderRadius: 1 }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )
      })}
    </Box>
  )
}
