"use client";

import { Entity, EntityType, Transcript } from "assemblyai";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import ErrorMessage from "@/components/features/insights/error-message";

interface InsightsCardProps {
  transcript: Transcript | undefined;
  loading: boolean;
  error: boolean;
  retry: () => void;
}

export default function InsightsCard({
  transcript,
  loading,
  error,
  retry,
}: InsightsCardProps) {
  const t = useTranslations("InsightsCard");

  return (
    <Card>
      <CardContent className="flex flex-col">
        {transcript && !loading && !error && (
          <>
            {transcript.entities && transcript.entities.length > 0 ? (
              <ScrollArea>
                <div className="flex flex-col gap-2">
                  <span className="font-bold">{t("entities")}</span>
                  <ul className="flex max-h-96 list-disc flex-col gap-1 pl-5 pr-4">
                    {[
                      ...transcript.entities
                        .reduce((entityGroups, entity) => {
                          const currentEntities =
                            entityGroups.get(entity.entity_type) ?? [];
                          return currentEntities.some(
                            (e) => e.text === entity.text,
                          )
                            ? entityGroups
                            : new Map(entityGroups).set(entity.entity_type, [
                                ...currentEntities,
                                entity,
                              ]);
                        }, new Map<EntityType, Entity[]>())
                        .entries(),
                    ].map(([entityType, entities]) => (
                      <li key={entityType}>
                        <span className="font-semibold">
                          {`${t(entityType, { count: entities.length })}: `}
                        </span>
                        {entities.map((entity) => entity.text).join(", ")}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                <p>{t("noEntities")}</p>
              </div>
            )}
          </>
        )}
        {loading && (
          <div className="flex w-full flex-col justify-center gap-4">
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-3/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-2/5" />
            </div>
            <div className="flex w-full flex-col justify-center gap-1">
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        )}
        {error && <ErrorMessage retry={retry} />}
      </CardContent>
    </Card>
  );
}
